import { Component } from '@angular/core';
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
import '../../../../assets/toast/main.js';
declare var toast: any;
import { ModalService } from '@app/user/service/modal.service';
import { PostService } from '@app/user/service/post.service';
import { ProfileService } from '@app/user/service/profile.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: [
    `./create-post.component.css`,
    '../css/modal.css']
})
export class CreatePostComponent {
  public createPostForm!: FormGroup;
  slideIndex: number = 1;
  slidesLength: string;
  selectedProvince: any;
  districtsTemp: any[] = [];
  selectedDistricts: any;
  wardsTemp: any[] = [];
  selectedWards: any;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  listImg: any[] = [];
  fileTemp: any = {};
  public file: any = {};
  constructor(
    public modalService: ModalService,
    public postService: PostService,
    private formbuilder: FormBuilder,
    private profileService: ProfileService,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.showSlides(1);
    this.createFormPost();
    this.loadAllProvince();
    // this.loadPosts();
  }

  createFormPost() {
    this.createPostForm = this.formbuilder.group({
      content: ['', Validators.required],
      hash_tag: ['', Validators.required],
      province_name: [''],
      district_name: [''],
      ward_name: [''],
      post_status: ['', Validators.required],
      product: ['', Validators.required],
      post_images: [''],
    });
  }
  get createPostFormControl() {
    return this.createPostForm.controls;
  }

  async createPost(event: any) {
    for (let img of this.file) {
      // this.fileTemp = event.target.img;
      // console.warn("this.fileTemp: " + img);
      // console.warn("this.fileTemp.name: " + img.name);
      // console.warn("this.fileTemp.name: " + this.file);
      await this.addData(img);
    }

    var data = {
      content: this.createPostForm.get('content')?.value,
      hash_tag: this.createPostForm.get('hash_tag')?.value,
      province_name: this.createPostForm.get('province_name')?.value,
      district_name: this.createPostForm.get('district_name')?.value,
      ward_name: this.createPostForm.get('ward_name')?.value,
      post_status: this.createPostForm.get('post_status')?.value,
      product: this.createPostForm.get('product')?.value,
      post_images: this.listImg,
    };

    this.postService.uploadPost(data).subscribe(() => {
      // if (res != '') {
      //   new toast({
      //     title: 'Thất bại!',
      //     message: 'Thất bại!',
      //     type: 'error',
      //     duration: 5000,
      //   });
      // } else {
        new toast({
          title: 'Thành công!',
          message: 'Đăng bài thành công',
          type: 'success',
          duration: 1500,
        });
        this.loadPosts();
      })
    // })
  }

  listPosts: any;
  listPost: any;
  listUser: any[];
  listCount: any;
  loadPosts() {
    this.postService.loadPostNewsFeed().subscribe(() => {
      this.listPosts = this.postService.getDataPostNf();
      this.listPost = this.listPosts.post
      this.listUser = this.listPosts.user
      this.listCount = this.listPosts.count
    });
  }

  /* ============Comboxbox address============= */
  // loadAllGender() {
  //   this.profileService.loadAllGender().subscribe(() => {
  //     this.genders = [];
  //     this.genders = this.profileService.getAllGender();
  //   })
  // }
  dataEditProfile: any
  loadDataProfile() {
    this.profileService.loadDataEditProfile().subscribe(() => {
      this.dataEditProfile = this.profileService.getDataEditProfile();
    })
  }

  loadAllProvince() {
    this.profileService.loadAllProvince().subscribe(() => {
      this.provinces = [];
      this.provinces = this.profileService.getAllProvince();

      const province = this.createPostForm.get('province_name')?.value;
      this.profileService.loadAllDistrict(province).subscribe(() => {
        this.districts = [];
        this.districts = this.profileService.getAllDistrict();

        const district = this.createPostForm.get('district_name')?.value;
        this.profileService.loadAllWard(district).subscribe(() => {
          this.wards = [];
          this.wards = this.profileService.getAllWard();

        })
      })
    })
  }

  getProvinceName() {
    const province = this.createPostForm.get('province_name')?.value;
    this.loadAllDistrict(province);

  }

  loadAllDistrict(province: string) {
    this.profileService.loadAllDistrict(province).subscribe(() => {
      this.districts = [];
      this.districts = this.profileService.getAllDistrict();
      // this.dataEditProfile.district_name = this.districts[0];

      // this.loadAllWard(this.dataEditProfile.district_name);

    })
  }

  getDistrictName() {
    const district = this.createPostForm.get('district_name')?.value;
    this.loadAllWard(district);
  }

  loadAllWard(district: string) {
    this.profileService.loadAllWard(district).subscribe(() => {
      this.wards = [];
      this.wards = this.profileService.getAllWard();
      // this.dataEditProfile.ward_name = this.wards[0];
    })
  }

  /* ============template============= */
  imageSources: string[] = [];

  uploadImg(event: any) {
    this.file = event.target.files;
    const blobs = this.toBlob(this.file);
    this.imageSources = blobs.map(blob => URL.createObjectURL(blob));
  }

  toBlob(files: FileList) {
    const blobs: Blob[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)!;
      const blob = new Blob([file], { type: file.type });
      blobs.push(blob);
    }
    return blobs;
  }

  async addData(file:any) {
    return new Promise<void>((resolve) => {
      const storageRef = ref(this.storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, this.fileTemp);
      uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => {
          console.log(error.message);
          resolve();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Upload file : ', downloadURL);
            this.listImg.push(downloadURL);
            resolve();
          });
        }
      );
    });
  }

  // addData() {
  //   const storageRef = ref(this.storage, this.fileTemp.name);
  //   const uploadTast = uploadBytesResumable(storageRef, this.fileTemp);
  //   uploadTast.on(
  //     'state_changed',
  //     (snapshot) => {},
  //     (error) => {
  //       console.log(error.message);
  //     },
  //     () => {
  //       getDownloadURL(uploadTast.snapshot.ref).then((downloadURL) => {
  //         console.log('Upload file : ', downloadURL);
  //        this.listImg.push(downloadURL);
  //       });
  //     }
  //   );
  // }
  chooseFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
    // this.addData();
  }



  listCupUser = [
    "../../../assets/images/posts/book.png",
    "../../../assets/images/posts/chair.png",
    "../../../assets/images/posts/converse.png",
  ];
  // Next/previous controls
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i: number;
    let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
    const numberText = document.getElementById("numbertext")!;

    this.slidesLength = slides.length.toString();
    // Kiểm tra nếu slideIndex vượt quá giới hạn
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    // Ẩn tất cả các slides
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    // Kiểm tra slideIndex có hợp lệ trước khi hiển thị slide và dot tương ứng
    if (this.slideIndex >= 1 && this.slideIndex <= slides.length) {
      (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
      numberText.textContent = this.slideIndex.toString();
    }
  }

  closeModalCreatePost() {
    this.modalService.closeModalCreatePost();
  }
}
