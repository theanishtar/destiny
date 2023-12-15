import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e, { error } from 'jquery';

import * as XLSX from 'xlsx';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
declare var $: any;
declare var toast: any;

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// Load the font supporting Vietnamese characters

import { FileSaverService } from 'ngx-filesaver';



import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';


import { ForbiddenService } from '../service/forbidden.service';
@Component({
  selector: 'app-forbidden-word',
  templateUrl: './forbidden-word.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`,
    `./forbidden-word.component.css`
  ]
})
export class ForbiddenWordComponent implements OnInit {

  private isOpenCreateWord = new BehaviorSubject<boolean>(false);
  isOpenCreateWord$ = this.isOpenCreateWord.asObservable();

  listBadWord: any[] = [];
  isLoading: boolean = true;
  badword: any = {};

  newBadwordForm: FormGroup;
  badwordUpdateForm: FormGroup;

  oldName: '';

  day: any;
  month: any;
  year: any;

  ExcelData: any[];
  dataCheck: any;

  checkWordCountRedis: any;

  ngOnInit() {

    this.getTime();
    this.loadBadWord();
    this.checkRedis();
    this.createBadwordForm();
  }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private forbiddenService: ForbiddenService,
    private formbuilder: FormBuilder,
    private fileSaver: FileSaverService,
  ) { }

  sendDataRedis() {
    this.isLoading = true;
    try {
      this.forbiddenService.sendDataRedis().subscribe(() => {

        this.isLoading = false;
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  downloadExcel() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const workSheet = XLSX.utils.json_to_sheet(this.listBadWord);

    const workBook = {
      Sheets: {
        'testingSheet': workSheet
      },
      SheetNames: ['testingSheet']
    }

    const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });

    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, "Badwords")


  }

  downloadPdf() {
    let doc = new jsPDF();

    // Set the font to Noto Sans Vietnamese
    doc.setFont('NotoSans');

    autoTable(doc, { html: "#dataTable" })
    doc.save("badwords.pdf");
  }

  readJson(event: any) {
    let file = event.target.files[0];

    if (file) {
      // Check if the file has a valid JSON file extension
      if (this.isValidJsonFile(file.name)) {
        let fileReader = new FileReader();

        fileReader.onload = (e) => {
          try {

            const jsonData = JSON.parse(fileReader.result as string);

            if (this.hasNameProperty(jsonData)) {

              this.forbiddenService.addBadwords(jsonData).subscribe(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 600);
              });
            } else {
              this.createToast("Tên của đối tượng không đúng định dạng!", "Tên đúng định dạng: 'name'", "error");
            }
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };

        fileReader.readAsText(file);
      } else {
        this.createToast("File không đúng định dạng!", "File bạn chọn không phải là file Json", "error");
      }
    }
  }

  isValidJsonFile(fileName: string): boolean {
    const validExtensions = ['.json'];
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

    return validExtensions.includes('.' + fileExtension.toLowerCase());
  }

  hasNameProperty(jsonData: any): boolean {
    // Check if jsonData is an array and at least one object in the array has a 'name' property
    return Array.isArray(jsonData) && jsonData.some(obj => obj && typeof obj === 'object' && 'name' in obj);
  }

  readExcel(event: any) {
    let file = event.target.files[0];

    // Check if the file is an Excel file based on its extension
    if (file && this.isExcelFile(file.name)) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {
        let workBook = XLSX.read(fileReader.result, { type: 'binary' });
        let sheetNames = workBook.SheetNames;
        let sheet = workBook.Sheets[sheetNames[0]];

        // Check if the sheet contains the required column name
        if (this.hasRequiredColumn(sheet, 'name')) {
          this.ExcelData = XLSX.utils.sheet_to_json(sheet);

          this.forbiddenService.addBadwords(this.ExcelData).subscribe(() => {
            setTimeout(() => {
              window.location.reload();
            }, 600);
          });
        } else {
          this.createToast("Tên cột không đúng định dạng!", "Tên cột đúng định dạng: 'name'", "error");
        }
      }
    } else {
      this.createToast("File không đúng định dạng!", "File bạn chọn không phải là file Excel", "error");
    }
  }

  // Function to check if the file has a valid Excel extension
  isExcelFile(fileName: string): boolean {
    const allowedExtensions = ['.xls', '.xlsx'];
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

    return allowedExtensions.includes('.' + fileExtension.toLowerCase());
  }

  hasRequiredColumn(sheet: XLSX.WorkSheet, columnName: string): boolean {
    const headerRow = 0; // Assuming column names are in the first row (index 0)

    if (!sheet || !sheet['!ref']) {
      // Handle the case where the sheet is empty or doesn't have a reference
      return false;
    }

    const range = XLSX.utils.decode_range(sheet['!ref']);
    const maxCol = range.e.c; // Get the index of the last column

    for (let col = 0; col <= maxCol; col++) {
      const cellAddress = { r: headerRow, c: col };
      const cellRef = XLSX.utils.encode_cell(cellAddress);

      if (sheet[cellRef] && sheet[cellRef].v === columnName) {
        return true;
      }
    }

    return false;
  }

  createToast(action: string, content: string, type: string) {
    new toast({
      title: action,
      message: content,
      type: type,
      duration: 3000,
    });
  }

  getTime() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  createBadwordForm() {
    this.newBadwordForm = this.formbuilder.group({
      newWord: ['', Validators.required],
    });

    this.badwordUpdateForm = this.formbuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      level: ['', Validators.required],
      date_create: ['', Validators.required],
    });
  }

  getBadword(data: any) {
    this.badword = data;
    this.oldName = this.badword.name;
  }

  deleteBadword(name: string) {
    this.forbiddenService.removeBadword(name).subscribe(() => {
      window.location.reload();
      // this.listBadWord = this.listBadWord.filter((word) => word.name !== name);

    });

  }

  updateBadword() {

    const updateWordForm = this.el.nativeElement.querySelector("#update-word");

    if (this.badwordUpdateForm.valid) {
      const data = {
        name: this.badwordUpdateForm.get('name')?.value,
      };
      this.forbiddenService.updateBadword(data, this.oldName).subscribe(() => {

        // const indexToUpdate = this.listBadWord.findIndex((word) => word.name === this.oldName);
        // if (indexToUpdate !== -1) {
        //   this.listBadWord[indexToUpdate].name = data.name;

        // }
        setTimeout(() => {
          updateWordForm.style.display = 'none';
          window.location.reload();
        }, 600);
      });

    }
  }

  addBadword() {

    const addWordForm = this.el.nativeElement.querySelector("#form");

    if (this.newBadwordForm.valid) {
      const data = {
        name: this.newBadwordForm.get('newWord')?.value,
        // label: 1,
        // severityLevel: 1,
        // formatDate: this.day + "-" + this.month + "-" + this.year,
      };
      this.forbiddenService.addBadword(data).subscribe(() => {
        // this.listBadWord.push(data);

        setTimeout(() => {
          addWordForm.style.display = 'none';
          window.location.reload();
        }, 600);
      });
    }
  }

  loadBadWord() {
    try {
      this.forbiddenService.loadDataBadWord().subscribe(() => {

        this.listBadWord = this.forbiddenService.getDataBadWord();
        this.isLoading = false;
        $e(document).ready(function () {
          $e('#dataTable').DataTable();
        });

      })
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async checkRedis(){
    this.checkWordCountRedis = await this.forbiddenService.checkRedis();
    console.warn("this.checkWordCountRedis: " + this.checkWordCountRedis)
  }

  openModalCreateWord() {
    this.isOpenCreateWord.next(true);
  }

  closeModalCreateWord() {
    this.isOpenCreateWord.next(false);
  }

}
