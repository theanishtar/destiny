import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import 'datatables.net';
import '../../../assets/js/admin/database/datatables/jquery.dataTables.min.js'
import '../../../assets/js/admin/database/datatables/dataTables.bootstrap4.js'
import $e from 'jquery';
import { Chart } from '../../../assets/js/admin/chart.js/chartjs.min.js';

import { LoginService } from '@app/service/login.service';

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

import { AdminManagementService } from '../service/admin-management.service';
import '../../../assets/toast/main.js';
declare var toast: any;

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: [
    `../css/sb-admin-2.min.css`,
    `../css/owner.css`,
  ],
})
export class AdminManagementComponent {
  @ViewChild('chartLine') chartLine: ElementRef | undefined;
  @ViewChild('uploadPreviewAvatar') uploadPreviewAvatar: ElementRef;

  totalPost: number;
  totalUser: number;

  listTotalPostEveryMonth: number[];
  listTotalUserEveryMonth: number[];

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
  passwordAdmin!: HTMLElement;
  avatar!: HTMLElement;
  roles!: HTMLElement;

  fileAvatar: any = {};
  avatarTemp = '';
  initalAvatar: string;
  checkAvatar: boolean = false;
  listAdmin: any;
  listMod: any;
  listUser: any;
  infoOwner: any = {};
  infoEdit: any = {
    ban: false,
    user_id: "",
    avatar: "",
    username: "",
    fullname: "",
    email: "",
    birthDayStringYear: "",
    authorities : [
      {authority: ""}
    ]
  };

  isLoading: boolean = true;
  public profileForm!: FormGroup;
  public createAccountForm!: FormGroup;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formbuilder: FormBuilder,
    public storage: Storage,
    private adminManagementService: AdminManagementService,
    public loginService: LoginService
  ){}

  ngOnInit() {
    this.createFormProfileEdit();
    this.createFormCreateAccount();
    this.loadDataLists();
    this.loadDataInfoOwner();
    
  }
  ngAfterViewInit() {
    this.loadTotalPost();
    this.loadTotalUser();

    this.loadListTotalPostEveryMonth();
    this.loadListTotalUserEveryMonth();

    
  }

  loadTotalPost() {
    this.adminManagementService.loadTotalPost().subscribe(() => {
      this.totalPost = 0;
      this.totalPost = this.adminManagementService.getTotalPost();


    })
  }

  loadTotalUser() {
    this.adminManagementService.loadTotalUser().subscribe(() => {
      this.totalUser = 0;
      this.totalUser = this.adminManagementService.getTotalUser();

    })
  }

  loadListTotalPostEveryMonth() {
    this.adminManagementService.loadTotalPostEveryMonth().subscribe(() => {
      this.listTotalPostEveryMonth = [];
      this.listTotalPostEveryMonth = this.adminManagementService.getListTotalPostEveryMonth();
    })
  }

  loadListTotalUserEveryMonth() {
    this.adminManagementService.loadTotalUserEveryMonth().subscribe(() => {
      this.listTotalUserEveryMonth = [];
      this.listTotalUserEveryMonth = this.adminManagementService.getListTotalUserEveryMonth();
      this.createChartLine();
    })
  }

  async loadDataLists() {
    try {
      this.listAdmin = await this.adminManagementService.loadDataListAdminApi();
      this.listMod = await this.adminManagementService.loadDataListModApi();
      this.combineDataLists();
      this.loadInfoEdit(this.listAdmin[0]);
      this.isLoading = false;
    } catch (error) {
      console.error('Error in loadDataLists:', error);
    }
  }
  
  combineDataLists() {
    if (this.listAdmin && this.listMod) {
      this.listUser = [...this.listAdmin, ...this.listMod];
      $e(document).ready(function () {
        $e('#dataTable').DataTable();
      });
    }
  }

  async loadDataInfoOwner() {
    try {
      this.infoOwner = await this.adminManagementService.loadDataInfoOwnerApi();
      this.initalAvatar = this.infoOwner?.avatar;
    } catch (error) {
      console.error('Error in loadDataInfoOwner:', error);
    }
  }

  loadInfoEdit(user: any) {
    this.checkInput = false;
    if (user) {
      this.infoEdit = user;
    } else if (this.listAdmin && this.listAdmin.length > 0) {
      this.infoEdit = this.listAdmin[0];
    } else {
      console.error('Error: Both user and listAdmin are undefined or empty.');
    }
  }
  
  createFormProfileEdit() {
    this.profileForm = this.formbuilder.group({
      username: [{ value: '', disabled: true }, Validators.required],
      fullname: [{ value: '', disabled: true }, [Validators.required]],
      birthday: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    });
  }
  get profileFormControl() {
    return this.profileForm.controls;
  }
  
  async updateProfile(){
    try {
      if (this.checkAvatar === true) {
        await this.addDataAvatar();
      } else {
        this.avatarTemp = this.initalAvatar;
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }

    // if (this.profileForm.valid) {
      var data = {
        username: this.profileForm.get('username')!.value,
        fullname: this.profileForm.get('fullname')!.value,
        birthday: this.profileForm.get('birthday')!.value,
        email: this.profileForm.get('email')!.value,
        avatar: this.avatarTemp,
      }
      // console.warn("data: " + JSON.stringify(data))
      this.adminManagementService.updateOwnerApi(data).subscribe(() => {

        this.loadDataInfoOwner();
      })
    // }
  }

  updateStatus(id){
    // console.warn("data: " + id)
    this.adminManagementService.updateStatusApi(id).subscribe(() => {

      this.loadDataLists();
    })
  }

  createFormCreateAccount() {
    this.createAccountForm = this.formbuilder.group({
      fullname: [{ value: '', disabled: true }, [Validators.required]],
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: false }, [Validators.required]],
      re_password: [{ value: '', disabled: false }, [Validators.required]],
      roles: [{ value: '', disabled: true }, [Validators.required]],
      birthday: [{ value: '', disabled: true }],
    });
  }
  get createFormControl() {
    return this.createAccountForm.controls;
  }
  
  createAccount(){
    this.buttonCreate = this.el.nativeElement.querySelector("#buttonCreate");
    this.buttonDisabled = this.el.nativeElement.querySelector("#buttonDisabled");
    if(this.createAccountForm.get('password')!.value === this.createAccountForm.get('re_password')!.value){
      var data = {
        fullname: this.createAccountForm.get('fullname')!.value,
        username: this.createAccountForm.get('username')!.value,
        email: this.createAccountForm.get('email')!.value,
        password: this.createAccountForm.get('password')!.value,
        roles: this.createAccountForm.get('roles')!.value
      }
      // console.warn("data1: " + JSON.stringify(data))
      // console.warn("data2: " + this.createAccountForm.get('roles')!.value)
      this.adminManagementService.createUserApi(data, this.createAccountForm.get('roles')!.value).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Thêm thành công',
          type: 'success',
          duration: 3000,
        })
        this.loadDataLists();
        this.createAccountForm.reset();
        this.renderer.addClass(this.buttonCreate, "d-none");
        this.renderer.removeClass(this.buttonDisabled, "d-none");
      })
    }else{
      new toast({
        title: 'Thất bại!',
        message: 'Vui lòng kiểm tra xác nhận mật khẩu',
        type: 'error',
        duration: 1500,
      })
    }
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

  checkInput: boolean = false;
  createAdmin() {
    this.buttonCreate = this.el.nativeElement.querySelector("#buttonCreate");
    this.buttonDisabled = this.el.nativeElement.querySelector("#buttonDisabled");

    this.usernameAdmin = this.el.nativeElement.querySelector("#admin-username");
    this.fullnameAdmin = this.el.nativeElement.querySelector("#admin-fullname");
    this.birthdayAdmin = this.el.nativeElement.querySelector("#admin-birthday");
    this.emailAdmin = this.el.nativeElement.querySelector("#admin-email");
    this.roles = this.el.nativeElement.querySelector("#admin-roles");
    // this.passwordAdmin = this.el.nativeElement.querySelector("#admin-password");
    // this.avatar = this.el.nativeElement.querySelector("#avatar");

    if (this.buttonCreate.classList.contains("d-none")) {

      this.renderer.removeClass(this.buttonCreate, "d-none");
      this.renderer.addClass(this.buttonDisabled, "d-none");

      this.setRemoveDisableForm(this.usernameAdmin);
      this.setRemoveDisableForm(this.fullnameAdmin);
      this.setRemoveDisableForm(this.birthdayAdmin);
      this.setRemoveDisableForm(this.emailAdmin);
      this.setRemoveDisableForm(this.roles);
      this.setButtonValue(this.usernameAdmin, "");
      this.setButtonValue(this.fullnameAdmin, "");
      this.setButtonValue(this.birthdayAdmin, "");
      this.setButtonValue(this.emailAdmin, "");
      this.setButtonValue(this.roles, "");

      // this.passwordAdmin.style.display = 'block';
      // this.avatar.style.display = 'block';
      this.checkInput = true;

    } else {

      this.renderer.addClass(this.buttonCreate, "d-none");
      this.renderer.removeClass(this.buttonDisabled, "d-none");

      this.setAddDisableForm(this.usernameAdmin);
      this.setAddDisableForm(this.fullnameAdmin);
      this.setAddDisableForm(this.birthdayAdmin);
      this.setAddDisableForm(this.emailAdmin);
      this.setAddDisableForm(this.roles);
      // this.passwordAdmin.style.display = 'none';
      // this.avatar.style.display = 'none';
      this.checkInput = false;

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
                data: this.listTotalPostEveryMonth,

              },
              {
                label: "Người dùng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: this.listTotalUserEveryMonth,
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