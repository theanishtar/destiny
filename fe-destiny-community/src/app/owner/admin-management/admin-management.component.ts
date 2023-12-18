import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';
import { Chart } from '../../../assets/js/admin/chart.js/chartjs.min.js';


import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/owner.css`
  ],
})
export class AdminManagementComponent {
  @ViewChild('chartLine') chartLine: ElementRef | undefined;
  @ViewChild('uploadPreviewAvatar') uploadPreviewAvatar: ElementRef;

  iconEdit!: HTMLElement;
  buttonUpdate!: HTMLElement;
  buttonCreate!: HTMLElement;
  buttonDisabled!: HTMLElement;

  username!: HTMLElement;
  fullname!: HTMLElement;
  birthday!: HTMLElement;
  email!: HTMLElement;

  usernameAdmin!: HTMLElement;
  fullnameAdmin!: HTMLElement;
  birthdayAdmin!: HTMLElement;
  emailAdmin: HTMLElement;

  fileAvatar: any = {};
  avatarTemp = '';
  initalAvatar: string;
  checkAvatar: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formbuilder: FormBuilder,
    public storage: Storage,
  ) { }

  ngAfterViewInit() {
    $e(document).ready(function () {
      $e('#dataTable').DataTable();
    });

    this.createChartLine();
  }

  editProfile() {
    this.buttonUpdate = this.el.nativeElement.querySelector("#buttonUpdate");
    this.username = this.el.nativeElement.querySelector("#username");
    this.fullname = this.el.nativeElement.querySelector("#fullname");
    this.birthday = this.el.nativeElement.querySelector("#birthday");
    this.email = this.el.nativeElement.querySelector("#email");
    if (this.buttonUpdate.classList.contains("d-none")) {
      this.renderer.removeClass(this.buttonUpdate, "d-none");

      this.setRemoveDisableForm(this.username);
      this.setRemoveDisableForm(this.fullname);
      this.setRemoveDisableForm(this.birthday);
      this.setRemoveDisableForm(this.email);

    } else {
      this.renderer.addClass(this.buttonUpdate, "d-none");

      this.setAddDisableForm(this.username);
      this.setAddDisableForm(this.fullname);
      this.setAddDisableForm(this.birthday);
      this.setAddDisableForm(this.email);
    }
  }

  createAdmin() {
    this.buttonCreate = this.el.nativeElement.querySelector("#buttonCreate");
    this.buttonDisabled = this.el.nativeElement.querySelector("#buttonDisabled");

    this.usernameAdmin = this.el.nativeElement.querySelector("#admin-username");
    this.fullnameAdmin = this.el.nativeElement.querySelector("#admin-fullname");
    this.birthdayAdmin = this.el.nativeElement.querySelector("#admin-birthday");
    this.emailAdmin = this.el.nativeElement.querySelector("#admin-email");

    if (this.buttonCreate.classList.contains("d-none")) {

      this.renderer.removeClass(this.buttonCreate, "d-none");
      this.renderer.addClass(this.buttonDisabled, "d-none");

      this.setRemoveDisableForm(this.usernameAdmin);
      this.setRemoveDisableForm(this.fullnameAdmin);
      this.setRemoveDisableForm(this.birthdayAdmin);
      this.setRemoveDisableForm(this.emailAdmin);

      this.setButtonValue(this.usernameAdmin, "");
      this.setButtonValue(this.fullnameAdmin, "");
      this.setButtonValue(this.birthdayAdmin, "");
      this.setButtonValue(this.emailAdmin, "");

    } else {

      this.renderer.addClass(this.buttonCreate, "d-none");
      this.renderer.removeClass(this.buttonDisabled, "d-none");

      this.setAddDisableForm(this.usernameAdmin);
      this.setAddDisableForm(this.fullnameAdmin);
      this.setAddDisableForm(this.birthdayAdmin);
      this.setAddDisableForm(this.emailAdmin);

    }
  }

  setRemoveDisableForm(el: HTMLElement) {
    this.renderer.removeAttribute(el, "disabled");
  }

  setAddDisableForm(el: HTMLElement) {
    this.renderer.setAttribute(el, "disabled", "");;
  }

  setButtonValue(el: HTMLElement, newValue: string) {
    this.renderer.setProperty(el, 'value', newValue);
  }

  chooseFile(event: any) {
    this.fileAvatar = event.target.files[0];
    this.checkAvatar = true;
    this.chooseFileChange(event, this.uploadPreviewAvatar);
    // this.addData();
  }

  chooseFileChange(event: any, preview: ElementRef): void {
    const fileInput = event.target;
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageSrc = e.target.result;
        preview.nativeElement.src = imageSrc;
        preview.nativeElement.style.display = 'block';
        preview.nativeElement.style.backgroundImage = 'url(' + imageSrc + ')';
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async addDataAvatar() {
    return new Promise<void>((resolve) => {
      const storageRef = ref(this.storage, 'avatars/' + this.fileAvatar.name);
      const uploadTast = uploadBytesResumable(storageRef, this.fileAvatar);
      uploadTast.on(
        'state_changed',
        (snapshot) => { },
        (error) => {
          console.log(error.message);
          resolve();
        },
        () => {
          getDownloadURL(uploadTast.snapshot.ref).then((downloadURL) => {
            // console.log('Upload file : ', downloadURL);
            this.avatarTemp = downloadURL;
            // console.log('this.avatarTemp : ', this.avatarTemp);
            resolve();
          });
        }
      );
    })
  }

  createChartLine() {
    // chartline
    if (this.chartLine) {
      try {
        const ctx2 = this.chartLine.nativeElement.getContext('2d');

        const gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
        gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
        gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

        const gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);
        gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
        gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
        gradientStroke2.addColorStop(0, "rgba(20,23,39,0)"); //purple colors

        const gridOptions: any = {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
        };

        const gridOptions2: any = {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5],
        };

        const newChart = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Bài đăng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#cb0c9f",
                borderWidth: 3,
                backgroundColor: gradientStroke1,
                fill: true,
                // data: this.listTotalPostEveryMonth,
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              },
              {
                label: "Người dùng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                // data: this.listTotalUserEveryMonth,
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
            scales: {
              y: {
                beginAtZero: true, // Start the y-axis at 0
                grid: gridOptions,
                ticks: {
                  display: true,
                  padding: 10,
                  color: "#b2b9bf",
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
              x: {
                grid: gridOptions2,
                ticks: {
                  display: true,
                  color: "#b2b9bf",
                  padding: 20,
                  font: {
                    size: 11,
                    family: "Open Sans",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Chart creation error:', error);
      }
    }
  }
}
