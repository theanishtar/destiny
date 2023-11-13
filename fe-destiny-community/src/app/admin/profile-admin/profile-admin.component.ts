import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AdminProfileService } from '../service/admin-profile.service';
declare var toast: any;


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
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';


@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],

})
export class ProfileAdminComponent implements OnInit {
  @ViewChild('uploadPreviewThumb') uploadPreviewThumb: ElementRef;
  @ViewChild('uploadPreviewAvatar') uploadPreviewAvatar: ElementRef;


  iconProfile!: HTMLElement;
  imgThumbProfile!: HTMLElement;

  admin: any = {};

  genders: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  result: number = 0;

  public fileAvatar: any = {};
  public fileThumb: any = {};

  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  public newPasswordForm: FormGroup;
  public changeEmailForm: FormGroup;

  isLoading = true;

  avatarTemp = '';
  thumbTemp = '';

  initalAvatar: string;
  initalThumb: string;

  checkAvatar: boolean = false;
  checkThumb: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private adminProfileService: AdminProfileService,
    private formbuilder: FormBuilder,
    public storage: Storage,
  ) { }

  ngOnInit() {
    this.createFormProfile();

    this.loadAdminData();
    this.loadAllGender();
    this.loadAllProvince();

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

  createFormProfile() {
    this.profileForm = this.formbuilder.group({
      usernameF: ['', Validators.required],
      fullnameF: ['', Validators.required],
      emailF: ['', [Validators.required, Validators.email]],
      introF: [''],
      birthdayF: ['', Validators.required],
      gender_nameF: ['', Validators.required],
      province_nameF: ['', Validators.required],
      district_nameF: ['', Validators.required],
      ward_nameF: ['', Validators.required],
    });

    this.passwordForm = this.formbuilder.group({
      oldPassword: ['', Validators.required],
    });

    this.newPasswordForm = this.formbuilder.group({
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required],
    });

    this.changeEmailForm = this.formbuilder.group({
      oldPasswordEmail: ['', Validators.required],
      newEmail: ['', Validators.required]
    });
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
        preview.nativeElement.style.backgroundImage = 'url(' + imageSrc + ')';
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  loadAdminData() {
    const getProfile = "getProfile";
    this.adminProfileService.loadAdminData(getProfile).subscribe(() => {
      this.admin = {};
      this.admin = this.adminProfileService.getAdmin();
      this.initalAvatar = this.admin.avatar;
      this.initalThumb = this.admin.thumb;
      this.isLoading = false;
    })
  }

  loadAllGender() {
    this.adminProfileService.loadAllGender().subscribe(() => {
      this.genders = [];
      this.genders = this.adminProfileService.getAllGender();
    })
  }

  loadAllProvince() {
    this.adminProfileService.loadAllProvince().subscribe(() => {
      this.provinces = [];
      this.provinces = this.adminProfileService.getAllProvince();

      const getProfile = "getProfile";
      this.adminProfileService.loadAdminData(getProfile).subscribe(() => {
        this.admin = {};
        this.admin = this.adminProfileService.getAdmin();

        const province = this.admin.province_name;
        this.adminProfileService.loadAllDistrict(province).subscribe(() => {
          this.districts = [];
          this.districts = this.adminProfileService.getAllDistrict();

          const district = this.profileForm.get('district_nameF')?.value;
          this.adminProfileService.loadAllWard(district).subscribe(() => {
            this.wards = [];
            this.wards = this.adminProfileService.getAllWard();

          })
        })
      })
    })

  }

  getProvinceName() {
    const province = this.profileForm.get('province_nameF')?.value;
    this.loadAllDistrict(province);

  }

  loadAllDistrict(province: string) {
    this.adminProfileService.loadAllDistrict(province).subscribe(() => {
      this.districts = [];
      this.districts = this.adminProfileService.getAllDistrict();
      this.admin.district_name = this.districts[0];

      this.loadAllWard(this.admin.district_name);

    })
  }

  getDistrictName() {
    const district = this.profileForm.get('district_nameF')?.value;
    this.loadAllWard(district);
  }

  loadAllWard(district: string) {
    this.adminProfileService.loadAllWard(district).subscribe(() => {
      this.wards = [];
      this.wards = this.adminProfileService.getAllWard();
      this.admin.ward_name = this.wards[0];
    })
  }

  async updateProfile() {
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

    if (this.profileForm.valid) {
      const data = {
        username: this.profileForm.get('usernameF')?.value,
        fullname: this.profileForm.get('fullnameF')?.value,
        // email: this.profileForm.get('emailF')?.value,
        avatar: this.avatarTemp,
        thumb: this.thumbTemp,
        intro: this.profileForm.get('introF')?.value,
        birthday: this.profileForm.get('birthdayF')?.value,
        province_name: this.profileForm.get('province_nameF')?.value,
        district_name: this.profileForm.get('district_nameF')?.value,
        ward_name: this.profileForm.get('ward_nameF')?.value,
        gender_name: this.profileForm.get('gender_nameF')?.value,
      };
      this.adminProfileService.updateProfile(data).subscribe((res) => {
        this.createToast("Thành công!", "Cập nhật thành công", "success");
        window.location.reload();
      });
    }
    else {
      this.createToast("Thất bại!", "Cập nhật thất bại", "error");
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

  onInputCheckPassWorkValid(event: any) {
    const passwordPattern = /^(?=.*[!@#$%^&*]+)[a-z0-9.!@#$%^&*]{4,20}$/;
    const inputValue = event.target.value;

    if (!passwordPattern.test(inputValue)) {
      event.target.setCustomValidity('Mật khẩu phải có độ dài từ 4-20 ký tự và có ít nhất một ký tự đặc biệt!');
    } else {
      event.target.setCustomValidity('');
    }
  }

  stepsNum: number = 0;
  forgotPasswordCheck() {

    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll<HTMLElement>(".form-step");
    const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");

    const reNewPassword = this.el.nativeElement.querySelector("#renewpassword");
    const changePassModal = this.el.nativeElement.querySelector("#changePassModal");

    let formStepsNum = this.stepsNum;


    if (formStepsNum == Number(0) && this.passwordForm.valid) {
      const data = {
        oldPassword: this.passwordForm.get('oldPassword')?.value
      };
      this.adminProfileService.checkPassword(data).subscribe(() => {
        this.result = this.adminProfileService.getResultCheckPassword();
        if (this.result == 1) {
          this.createToast("Thành công!", "Mật khẩu đã đúng!", "success");
          this.stepsNum++;
          formStepsNum++;
          updateFormSteps();
          updateProgressbar();
        } else {
          this.createToast("Thất bại!", "Sai mật khẩu!", "error");
        }
      });
    }
    if (formStepsNum == Number(1) && this.newPasswordForm.valid) {
      const data = {
        newPassword: this.newPasswordForm.get('newPassword')?.value,
        reNewPassword: this.newPasswordForm.get('reNewPassword')?.value
      };
      if (data.newPassword == data.reNewPassword) {
        this.adminProfileService.changePassword(data).subscribe();
        this.createToast("Thành công!", "Thay đổi mật khẩu thành công!", "success");
        setTimeout(() => {
          changePassModal.style.display = 'none';
          location.reload();
        }, 600);
      } else {
        reNewPassword.setCustomValidity('Mật khẩu không giống nhau!');
      }
    }

    function updateFormSteps() {
      formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
          formStep.classList.remove("form-step-active");
      });
      // display none tắt modal đi
      formSteps[formStepsNum].classList.add("form-step-active");
    }

    function updateProgressbar() {
      progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
          progressStep.classList.add("progress-step-active");
        } else {
          progressStep.classList.remove("progress-step-active");
        }
      });

      const progressActive = document.querySelectorAll<HTMLElement>(
        ".progress-step-active"
      );

      progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
    }
  }

  changeEmailCheck() {

    const changePassModal = this.el.nativeElement.querySelector("#changePassModal");

    if (this.changeEmailForm.valid) {
      const data = {
        newEmail: this.changeEmailForm.get('newEmail')?.value,
        password: this.changeEmailForm.get('oldPasswordEmail')?.value
      };
      this.adminProfileService.changeMail(data).subscribe(() => {
        setTimeout(() => {
          changePassModal.style.display = 'none';
          location.reload();
        }, 600);
      });
    }
  }

  openProfile() {
    this.iconProfile = this.el.nativeElement.querySelector("#tab-profile");
    this.imgThumbProfile = this.el.nativeElement.querySelector("#img-thumb-profile");
    if (this.iconProfile.classList.contains("hidden")) {
      this.renderer.removeClass(this.iconProfile, "hidden");
      this.renderer.removeClass(this.imgThumbProfile, "col-lg-7");
      this.renderer.addClass(this.imgThumbProfile, "col-lg-10");
      this.renderer.addClass(this.imgThumbProfile, "offset-lg-1");
      setTimeout(() => {
        this.iconProfile.style.opacity = "1";
      }, 0);
    } else {
      this.iconProfile.style.opacity = "0";
      setTimeout(() => {
        this.renderer.addClass(this.iconProfile, "hidden");
        this.renderer.removeClass(this.imgThumbProfile, "col-lg-10");
        this.renderer.removeClass(this.imgThumbProfile, "offset-lg-1");
        this.renderer.addClass(this.imgThumbProfile, "col-lg-7");
      }, 300);
    }
  }

}
