import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
declare var $: any;

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

  ngOnInit() {

    this.getTime();
    this.loadBadWord();

    this.createBadwordForm();
  }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private forbiddenService: ForbiddenService,
    private formbuilder: FormBuilder,
  ) { }

  getTime() {
    this.day = new Date().getDay();
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

      // this.listBadWord = this.listBadWord.filter((word) => word.name !== name);

    });
    window.location.reload();

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
      this.forbiddenService.loadDataBadWordApi().subscribe(() => {

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


  openModalCreateWord() {
    this.isOpenCreateWord.next(true);
  }

  closeModalCreateWord() {
    this.isOpenCreateWord.next(false);
  }

}
