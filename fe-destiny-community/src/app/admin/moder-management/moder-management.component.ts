import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';

import { Router } from '@angular/router';

import { ModerManagenentService } from '../service/moder-managenent.service';

declare var toast: any;

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-moder-management',
  templateUrl: './moder-management.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/home.css`
  ],
})
export class ModerManagementComponent {
  pagiModerator!: HTMLElement;
  tableModerator!: HTMLElement;

  moderForm: FormGroup;

  day: any;
  month: any;
  year: any;

  isLoading = true;

  listModerator: any[] = [];

  moder: any = {
    intro: "",
    username: "",
    fullname: "",
    gender: {
      gender_name: ""
    },
    birthDayString: "",
    email: ""
  };

  moderDetail: any = {
    intro: "",
    username: "",
    fullname: "",
    gender: {
      gender_name: ""
    },
    birthDayString: "",
    email: ""
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private routers: Router,
    private moderManagenentService: ModerManagenentService,
    private formbuilder: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.getTime();
    this.createFormNewModer();
  }

  ngAfterViewInit() {
    this.carousel();
    this.loadListModerator();

  }

  createModer() {
    this.isLoading = true;
    const reNewPassword = this.el.nativeElement.querySelector("#rePasswordF");

    if (this.moderForm.valid) {
      const data = {
        username: this.moderForm.get('usernameF')?.value,
        fullname: this.moderForm.get('fullnameF')?.value,
        email: this.moderForm.get('emailF')?.value,
        birthday: this.moderForm.get('birthdayF')?.value,
        password: this.moderForm.get('passwordF')?.value,
        rePassword: this.moderForm.get('rePasswordF')?.value,
      };

      if (data.password != data.rePassword) {
        reNewPassword.setCustomValidity('Mật khẩu không giống nhau!');
      } else {

        this.moderManagenentService.createModer(data).subscribe(
          (data) => {
            this.isLoading = false;
            this.createToast("Thành công!", "Tạo mới thành công", "success");
            this.loadListModerator();
            this.createFormNewModer();
          },
          (error) => {
            this.isLoading = false;
            this.loadListModerator();
          }
        );
      }
    }
    else {
      this.createToast("Thất bại!", "Cập nhật thất bại", "error");
      this.isLoading = false;
    }
  }

  createToast(action: string, content: string, type: string) {
    new toast({
      title: action,
      message: content,
      type: type,
      duration: 3000,
    });
  }

  actionOnModer(id: number): void {

    if (this.moderDetail.ban == false) {
      this.moderManagenentService.actionOnModer(id).subscribe(() => { })
      new toast({
        title: 'Thành công!',
        message: 'Vô hiệu hóa thành công!',
        type: 'success',
        duration: 1500,
      })
      this.moderDetail.ban = true;
    } else {
      this.moderManagenentService.actionOnModer(id).subscribe(() => { })
      new toast({
        title: 'Thành công!',
        message: 'Kích hoạt thành công!',
        type: 'success',
        duration: 1500,
      })
      this.moderDetail.ban = false;
    }
    setTimeout(() => {
      // window.location.reload();
    }, 600);
  }

  createFormNewModer() {
    this.moderForm = this.formbuilder.group({
      usernameF: ['', Validators.required],
      passwordF: ['', Validators.required],
      rePasswordF: ['', Validators.required],
      fullnameF: ['', Validators.required],
      emailF: ['', [Validators.required, Validators.email]],
      birthdayF: ['', Validators.required],
    });
  }

  getTime() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  }

  selectModer(moderIsSelected: any = {}) {
    this.moderDetail = moderIsSelected;
  }

  loadListModerator() {
    this.moderManagenentService.loadListModers().subscribe(() => {
      this.listModerator = [];
      this.listModerator = this.moderManagenentService.getListModers();
      this.moderDetail = this.listModerator[0];
      $e(document).ready(function () {
        $e('#dataTable').DataTable();
      });
      this.isLoading = false;
    });
  }

  carousel() {
    $(document).ready(function () {
      $("#myCarousel").on("slide.bs.carousel", function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".carousel-item").length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
              $(".carousel-item").eq(i).appendTo(".carousel-inner");
            } else {
              let $myCarousel = $("#myCarousel");
              $(".carousel-item").eq(0).appendTo($myCarousel.find(".carousel-inner"));
            }
          }
        }
      });
    });

  }

  openTable() {
    
    this.pagiModerator = this.el.nativeElement.querySelector("#pagi-moderator");
    this.tableModerator = this.el.nativeElement.querySelector("#table-moderator");
    if (this.tableModerator.classList.contains("hidden")) {
      this.renderer.removeClass(this.tableModerator, "hidden");
      this.renderer.addClass(this.pagiModerator, "hidden");
    } else {
      this.renderer.removeClass(this.pagiModerator, "hidden");
      this.renderer.addClass(this.tableModerator, "hidden");
    }
  }


  onDateChange(event: any) {
    const daychose = event.target.value;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = parseInt('0' + dd, 10);
    if (mm < 10) mm = parseInt('0' + mm);
    const formattedToday = yyyy + '-' + mm + '-' + dd; //today
    // Split the dates into arrays
    const splitFrom = formattedToday.split('-');
    const splitTo = daychose.split('-');
    // Create Date objects from the arrays
    const toDay = new Date(parseInt(splitFrom[0]), parseInt(splitFrom[1]) - 1, parseInt(splitFrom[2]));
    const dayChoose = new Date(splitTo[0], splitTo[1] - 1, splitTo[2]);
    // Perform the comparison
    if (dayChoose > toDay) {
      event.target.setCustomValidity('Ngày sinh phải bé hơn ngày hiện tại!');
    }
  }

  onInput(event: any) {
    event.target.setCustomValidity('');
  }


}
