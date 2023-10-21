import { Component, OnInit, HostListener, ViewChild, ElementRef, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { liquid } from "../../../assets/js/utils/liquidify.js";
// import { tns } from '../../../assets/js/vendor/ti';
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
import { content } from '../../../assets/js/content/content.js';
import { form } from '../../../assets/js/form/form.utils.js';
import 'src/assets/js/utils/svg-loader.js';
import { DatePipe } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import Swal from 'sweetalert2';
// import {
//   Storage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from '@angular/fire/storage';

// 
import { ModalService } from '../service/modal.service';
import { ProfileService } from '../service/profile.service';
import '../../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/vendor/simplebar.css`,
    './edit-profile.component.css'
  ]
})

export class EditProfileComponent implements OnInit {
  // @ViewChild('uploadPreview') uploadPreview: ElementRef;
  public profileForm!: FormGroup;
  textAreaContent: string = ''; // Nội dung của textarea
  readonlyCondition: boolean = false; // Ban đầu không bị giới hạn
  checkValidDate: boolean = true;
  selectedProvince: any;
  districtsTemp: any[] = [];
  selectedDistricts: any;
  wardsTemp: any[] = [];
  selectedWards: any;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  genders: any[] = [];
  avatar = '';
  pass: any

  public file: any = {};
  dataEditProfile: any = {
    "avartar": "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.",
    "intro": "hi",
    "thumb": "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA.",
  };
  private userLogined: any[] = [];
  initialEmail: string; //Email lúc đầu chưa đổi
  userEmail: string; //Email sau
  ngOnInit() {
    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    content.contentTab();
    form.formInput();
    this.createFormProfile();
    this.loadDataProfile();
    this.loadAllGender();
    this.loadAllProvince();
    this.profileForm.get('email')!.valueChanges.subscribe((value) => {
      this.userEmail = value;
    });

  }

  constructor(
    public modalService: ModalService,
    public profileService: ProfileService,
    private formbuilder: FormBuilder,
    private cookieService: CookieService,
    private datePipe: DatePipe, //Định dạng ngày
    private router: Router,
    // public storage: Storage,
    // private fireStorage:AngularFireStorage
  ) {
    // this.initialEmail = this.dataEditProfile.email; // Gán giá trị email ban đầu
    // this.userEmail = this.initialEmail;
  }


  createFormProfile() {
    const NAME_PATTERN = /^[\p{L}\s]+$/u;
    this.profileForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['',
        [
          Validators.required,
          Validators.pattern(NAME_PATTERN),
        ]],
      email: ['', [Validators.required, Validators.email]],
      intro: [''],
      avatar: [''],
      birthday: [''],
      day_create: [''],
      gender: [''],
      idProvince: [''],
      idWard: [''],
      idDistrict: [''],
    });
  }

  get profileFormControl() {
    return this.profileForm.controls;
  }

  check: boolean = false
  updateProfile() {
    Swal.fire({
      title: 'Vui lòng nhập mật khẩu',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: (passwordTemp) => {
        this.pass = passwordTemp;
        var data = {
          username: this.profileForm.get('username')!.value,
          password: this.pass,
          fullname: this.profileForm.get('fullname')!.value,
          email: this.profileForm.get('email')!.value,
          intro: this.profileForm.get('intro')!.value,
          birthday: this.profileForm.get('birthday')!.value,
          gender_name: this.profileForm.get('gender')!.value,
          province_name: this.profileForm.get('idProvince')!.value,
          ward_name: this.profileForm.get('idWard')!.value,
          district_name: this.profileForm.get('idDistrict')!.value,
        };
        setTimeout(() => {
          // this.submitted = true;
          this.profileService.updateProfile(data).subscribe((response) => {
            if (response == '') {
              new toast({
                title: 'Thất bại!',
                message: 'Cập nhật thất bại!',
                type: 'error',
                duration: 5000,
              });
            } else {
              this.cookieService.set('full_name', response.name);
              this.cookieService.set('avatar', response.avatar);
              this.cookieService.set('role', response.roles[0].authority);
              new toast({
                title: 'Thành công!',
                message: 'Cập nhật thành công',
                type: 'success',
                duration: 1500,
              });
              setTimeout(() => {
                location.reload();
              }, 1500);
            }
          });
        }, 1000);
      },
    })



  }

  loadDataProfile() {
    this.profileService.loadDataEditProfile().subscribe(() => {
      this.dataEditProfile = this.profileService.getDataEditProfile();
      this.initialEmail = this.dataEditProfile.email;
    })
  }

  /* ============Check valid birthday============= */
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
      this.checkValidDate = false
    } else {
      this.checkValidDate = true
    }
  }

  /* ============Comboxbox address============= */
  loadAllGender() {
    this.profileService.loadAllGender().subscribe(() => {
      this.genders = [];
      this.genders = this.profileService.getAllGender();
    })
  }

  loadAllProvince() {
    this.profileService.loadAllProvince().subscribe(() => {
      this.provinces = [];
      this.provinces = this.profileService.getAllProvince();

      const province = this.profileForm.get('idProvince')?.value;
      this.profileService.loadAllDistrict(province).subscribe(() => {
        this.districts = [];
        this.districts = this.profileService.getAllDistrict();

        const district = this.profileForm.get('idDistrict')?.value;
        this.profileService.loadAllWard(district).subscribe(() => {
          this.wards = [];
          this.wards = this.profileService.getAllWard();

        })
      })
    })
  }

  getProvinceName() {
    const province = this.profileForm.get('idProvince')?.value;
    this.loadAllDistrict(province);

  }

  loadAllDistrict(province: string) {
    this.profileService.loadAllDistrict(province).subscribe(() => {
      this.districts = [];
      this.districts = this.profileService.getAllDistrict();
      this.dataEditProfile.district_name = this.districts[0];

      this.loadAllWard(this.dataEditProfile.district_name);

    })
  }

  getDistrictName() {
    const district = this.profileForm.get('idDistrict')?.value;
    this.loadAllWard(district);
  }

  loadAllWard(district: string) {
    this.profileService.loadAllWard(district).subscribe(() => {
      this.wards = [];
      this.wards = this.profileService.getAllWard();
      this.dataEditProfile.ward_name = this.wards[0];
    })
  }

  /* ============Template============= */

  // Giới hạn ký tự của bio
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // Người dùng đã bấm phím "Backspace", gỡ bỏ thuộc tính "readonly".
      this.readonlyCondition = false;
    }
  }
  // Hàm kiểm tra giới hạn và hiển thị thông báo
  checkCharacterLimit() {
    const maxCharacters = 180; // Giới hạn ký tự
    const characterCount = this.dataEditProfile.intro.length;
    const charCount = document.getElementById("charCount")!;
    charCount.textContent = characterCount.toString();
    if (characterCount >= maxCharacters) {
      new toast({
        title: 'Thông báo!',
        message: 'Vui lòng không nhập quá 180 ký tự',
        type: 'info',
        duration: 2000,
      });
      this.readonlyCondition = true;
      // Nếu vượt quá giới hạn, cắt nội dung để chỉ hiển thị 180 ký tự
      this.dataEditProfile.intro = this.dataEditProfile.intro.slice(0, maxCharacters);
    }
  }

  // Getter
  getUserLog(): any[] {
    return this.userLogined;
  }

  //   Setter
  setUserLog(data: any[]): void {
    this.userLogined = data;
  }

  // addData() {
  //   const storageRef = ref(this.storage, this.file.name);
  //   const uploadTast = uploadBytesResumable(storageRef, this.file);
  //   uploadTast.on(
  //     'state_changed',
  //     (snapshot) => {},
  //     (error) => {
  //       console.log(error.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTast.snapshot.ref).then((downloadURL) => {
  //         console.log('Upload file : ', downloadURL);
  //       });
  //     }
  //   );
  // }
  chooseFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
    // this.addData();
  }

}

