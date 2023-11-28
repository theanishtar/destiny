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
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

// 
import { ModalService } from '../service/modal.service';
import { ProfileService } from '../service/profile.service';
import { MessageService } from '../service/message.service';
import '../../../assets/toast/main.js';
declare var toast: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    './edit-profile.component.css'
  ]
})

export class EditProfileComponent implements OnInit {
  @ViewChild('uploadPreviewThumb') uploadPreviewThumb: ElementRef;
  @ViewChild('uploadPreviewAvatar') uploadPreviewAvatar: ElementRef;

  @ViewChild('fileInput') fileInput: ElementRef;
  fileName: string;
  fileItem: File;
  public fileAvatar: any = {};
  public fileThumb: any = {};
  private userLogined: any[] = [];
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
  pass: any;
  dataEditProfile: any = {};
  dataEditProfileTemp: any = {};
  initialUsername: string; //Email lúc đầu chưa đổi
  userName: string; //Email sau
  submitted: boolean = false;
  avatarTemp = '';
  thumbTemp = '';
  initalAvatar: string;
  initalThumb: string;
  checkAvatar: boolean = false;
  checkThumb: boolean = false;
  sender: any;
  isLoading = true;


  ngOnInit() {
    this.loadDataProfile();
    this.loadAllGender();
    this.loadAllProvince();
    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    // content.contentTab();
    form.formInput();
    
  }

  constructor(
    public modalService: ModalService,
    public profileService: ProfileService,
    private formbuilder: FormBuilder,
    private cookieService: CookieService,
    public storage: Storage,
    public messageService: MessageService
  ) {
    this.createFormProfile();
    this.profileForm.get('username')!.valueChanges.subscribe((value) => {
      this.userName = value;
    });
  }


  createFormProfile() {
    const NAME_PATTERN = /^[\p{L}\s]+$/u;
    this.profileForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: [''],
      fullname: ['',
        [
          Validators.required,
          Validators.pattern(NAME_PATTERN),
        ]],
      email: ['', [Validators.required, Validators.email]],
      intro: [''],
      avatar: [''],
      thumb: [''],
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

  async updateProfile(event: any) {
    try {
      if (this.checkThumb === true) {
        await this.addDataThumb();
      } else {
        this.thumbTemp = this.initalThumb;
      }
    } catch (error) {
      console.error('Error uploading thumb:', error);
    }

    try {
      if (this.checkAvatar === true) {
        await this.addDataAvatar();
      } else {
        this.avatarTemp = this.initalAvatar;
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }

    this.submitted = true;
    if (this.profileForm.valid) {
      var data = {
        username: this.profileForm.get('username')!.value,
        email: this.profileForm.get('email')!.value,
        fullname: this.profileForm.get('fullname')!.value,
        intro: this.profileForm.get('intro')!.value,
        birthday: this.profileForm.get('birthday')!.value,
        avatar: this.avatarTemp,
        thumb: this.thumbTemp,
        gender_name: this.profileForm.get('gender')!.value,
        province_name: this.profileForm.get('idProvince')!.value,
        ward_name: this.profileForm.get('idWard')!.value,
        district_name: this.profileForm.get('idDistrict')!.value,
      };
      // console.warn("data: " + JSON.stringify(data))
      this.profileService.updateProfile(data).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Cập nhật thành công',
          type: 'success',
          duration: 1500,
        })
        this.cookieService.set('avatar', this.avatarTemp);
        if (this.userName != this.initialUsername) {
          this.messageService.loadDataSender().subscribe(() => {
            this.sender = JSON.parse(JSON.stringify(this.messageService.getSender()));
            this.modalService.connectToComment(this.sender.user_id);
            this.messageService.connectToChat(this.sender.user_id);

          });
        }

        this.loadDataProfile();
      })
    }
  }

  cancelEdit() {
    Swal.fire({
			title: 'Bạn chắc chắn muốn hủy thao tác?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.value) {
        this.dataEditProfile = this.dataEditProfileTemp;
			}
		});
  }

  loadDataProfile() {
    let body_edit = document.getElementById('body-edit')!;
    body_edit.style.display = 'none';

    this.profileService.loadDataEditProfile().subscribe(() => {
      this.dataEditProfile = this.profileService.getDataEditProfile();
      this.dataEditProfileTemp = this.dataEditProfile;
      this.initialUsername = this.dataEditProfile.username;
      this.initalAvatar = this.dataEditProfile.avatar;
      this.initalThumb = this.dataEditProfile.thumb;
      this.isLoading = false;
      body_edit.style.display = 'grid';
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

      this.profileService.loadDataEditProfile().subscribe(() => {
        this.dataEditProfile = this.profileService.getDataEditProfile();

        const province = this.dataEditProfile.province_name;
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

  /* ============Upload images============= */

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

  async addDataThumb() {
    return new Promise<void>((resolve) => {
      const storageRef = ref(this.storage, 'thumb/' + this.fileThumb.name);
      const uploadTast = uploadBytesResumable(storageRef, this.fileThumb);
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
            this.thumbTemp = downloadURL;
            // console.log('this.thumbTemp : ', this.thumbTemp);
            resolve();
          });
        }
      );
    })

  }

  chooseFile(event: any) {
    this.fileAvatar = event.target.files[0];
    this.checkAvatar = true;
    this.chooseFileChange(event, this.uploadPreviewAvatar);
    // this.addData();
  }

  chooseFileThumb(event: any) {
    this.fileThumb = event.target.files[0];
    this.checkThumb = true;

    this.chooseFileChange(event, this.uploadPreviewThumb);
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
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  getFile(event: any): void {
    this.fileItem = event.target.files[0];
    this.fileName = this.fileItem.name;

    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(this.fileItem);
      const preview = this.fileInput.nativeElement.nextElementSibling;
      preview.src = src;
      preview.style.display = 'block';
    }
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

}

