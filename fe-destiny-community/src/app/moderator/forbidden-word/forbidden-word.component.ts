import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
declare var $: any;

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
export class ForbiddenWordComponent{
  pagiPostReport!: HTMLElement;
  tablePostReport!: HTMLElement;
  private isOpenCreateWord = new BehaviorSubject<boolean>(false);
  isOpenCreateWord$ = this.isOpenCreateWord.asObservable();
  listBadWord: any[] = [];
  isLoading: boolean = true;
  // ngOnInit() {
    
  // }

  ngAfterViewInit() {
    $e(document).ready(function () {
      $e('#dataTable').DataTable();
    });
    this.truncateText(".text-substring", 50);
    this.pagiPostReport = this.el.nativeElement.querySelector("#pagi-post-report");
    this.tablePostReport = this.el.nativeElement.querySelector("#table-post-report");

    this.loadBadWord();
  }
  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private forbiddenService: ForbiddenService
    ) { }

  async loadBadWord() {
    try {
      this.listBadWord = await this.forbiddenService.loadDataBadWordApi();
      // console.warn("list: " + JSON.stringify(this.listInterested));
      this.isLoading = false;
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


  private truncateText(selector: string, maxLength: number) {
    const elements = this.el.nativeElement.querySelectorAll(selector);

    elements.forEach((element: HTMLElement) => {
      const originalText = element.textContent;

      if ((originalText as any).length > maxLength) {
        this.renderer.setProperty(
          element,
          'textContent',
          (originalText as any).substring(0, maxLength - 3) + '...'
        );
      }
    });
  }
}
