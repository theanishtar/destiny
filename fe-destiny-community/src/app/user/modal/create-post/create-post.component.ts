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
    '../css/modal.css',
    `./create-post.component.css`,]
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
    console.log("this.file.length: " + this.file.length)
    if (this.file.length > 0) {
      for (let img of this.file) {
        await this.addData(img);
      }
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
    console.log('data: ' + JSON.stringify(data));
    this.postService.uploadPost(data).subscribe(() => {
      new toast({
        title: 'Thành công!',
        message: 'Đăng bài thành công',
        type: 'success',
        duration: 1500,
      });
      this.loadPosts();
      this.closeModalCreatePost();
    })
  }

  listPosts: any;
  listPost: any;
  listUser: any[];
  listCount: any;
  // loadPosts() {
  //   this.postService.loadPostNewsFeed().subscribe(() => {
  //     this.listPosts = this.postService.getDataPostNf();
  //     this.listPost = this.listPosts.post
  //     this.listUser = this.listPosts.user
  //     this.listCount = this.listPosts.count
  //   });
  // }
  async loadPosts() {
    try {
      // Gọi lại hàm loadTop5User() sử dụng await để đợi kết quả.
      this.listPosts = await this.postService.loadPostNewsFeed();
      this.listPost = this.listPosts.post
      this.listUser = this.listPosts.user
      this.listCount = this.listPosts.count
    } catch (error) {
      // Xử lý lỗi ở đây nếu có.
      console.error('Error:', error);
    }
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

  /* ============upload Images============= */
  imageSources: string[] = [];

  uploadImg(event: any) {
    this.file = event.target.files;
    const blobs = this.toBlob(this.file);
    this.imageSources = blobs.map(blob => URL.createObjectURL(blob));
  }

  // 
  toBlob(files: FileList) {
    const blobs: Blob[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)!;
      const blob = new Blob([file], { type: file.type });
      blobs.push(blob);
    }
    return blobs;
  }
  createFileList(array) {
    const dataTransfer = new DataTransfer();
    for (const file of array) {
      dataTransfer.items.add(file);
    }
    return dataTransfer.files;
  }

  deleteImg(event: any, i) {
    if (i >= 0 && i < this.file.length) {
      // Tạo một mảng thường
      const newArray = Array.from(this.file);
      // Xóa phần tử từ mảng thường
      newArray.splice(i, 1);
      // Cập nhật this.file từ mảng thường
      this.file = this.createFileList(newArray);
      // Sau khi xóa, tạo lại danh sách blobs và image sources
      const blobs = this.toBlob(this.file);
      this.imageSources = blobs.map(blob => URL.createObjectURL(blob));
    }
  }


  async addData(file: any) {
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

  chooseFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
    // this.addData();
  }

  /* ============Template============= */
  // Next/previous controls
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n: number) {
    let i: number;
    let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
    // const numberText = document.getElementById("numbertext")!;

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
      // numberText.textContent = this.slideIndex.toString();
    }
  }

  closeModalCreatePost() {
    this.modalService.closeModalCreatePost();
  }
}
