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
  listPosts: any;
  listPost: any;
  listUser: any[];
  listCount: any;
  dataEditProfile: any
  isLoading: boolean = false;
  checkBtn: boolean = false;

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
    this.loadDataProfile();
  }

  createFormPost() {
    const HASHTAG_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{4,20}$/;
    this.createPostForm = this.formbuilder.group({
      content: [''],
      hash_tag: ['', [Validators.required, Validators.pattern(HASHTAG_PATTERN),]],
      province_name: [''],
      district_name: [''],
      ward_name: [''],
      post_status: [''],
      product: ['', Validators.required],
      post_images: [''],
    });
  }
  get createPostFormControl() {
    return this.createPostForm.controls;
  }

  async createPost(event: any) {
    let body = document.getElementById('body-create-post');
    this.isLoading = true;
    if (body && this.isLoading) {
      body.style.opacity = '0';
    }
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

    if (this.createPostForm.get('content')?.value === '' && this.listImg.length === 0) {
      this.isLoading = false;
      if (body && !this.isLoading) {
        body.style.opacity = '1';
      }
      new toast({
        title: 'Thông báo!',
        message: 'Vui lòng không bỏ trống đồng thời nội dung và hình ảnh',
        type: 'warning',
        duration: 3000,
      });
      
    }
    if (this.createPostForm.valid) {
      this.postService.uploadPost(data).subscribe((res) => {
        new toast({
          title: 'Thành công!',
          message: 'Đăng bài thành công',
          type: 'success',
          duration: 1500,
        });
        this.listPosts = res;
        this.createPostForm.reset();
        this.listImg = [];
        this.file = {};
        this.closeModalCreatePost();
        this.isLoading = false;
      });
    }
  }


  async loadPosts() {
    try {
      // Gọi lại hàm loadTop5User() sử dụng await để đợi kết quả.
      // this.listPosts = await this.postService.loadPostNewsFeed();
      this.listPost = this.listPosts.post
      this.listUser = this.listPosts.user
      this.listCount = this.listPosts.count
    } catch (error) {
      // Xử lý lỗi ở đây nếu có.
      console.error('Error:', error);
    }
  }

  /* ============Comboxbox address============= */
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

          const district = this.dataEditProfile.district_name;
          this.profileService.loadAllWard(district).subscribe(() => {
            this.wards = [];
            this.wards = this.profileService.getAllWard();

          })
        })
      })

    })
  }

  getProvinceName() {
    const province = this.createPostForm.get('province_name')?.value;
    console.warn("province: " + province);
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
    const district = this.createPostForm.get('district_name')?.value;
    this.loadAllWard(district);
  }

  loadAllWard(district: string) {
    this.profileService.loadAllWard(district).subscribe(() => {
      this.wards = [];
      this.wards = this.profileService.getAllWard();
      this.dataEditProfile.ward_name = this.wards[0];
    })
  }
  loadDataProfile() {
    this.profileService.loadDataEditProfile().subscribe(() => {
      this.dataEditProfile = this.profileService.getDataEditProfile();
    })
  }

  // loadAllProvince() {
  //   this.profileService.loadAllProvince().subscribe(() => {
  //     this.provinces = [];
  //     this.provinces = this.profileService.getAllProvince();

  //     const province = this.createPostForm.get('province_name')?.value;
  //     //province này null nên truyền vô tìm tất cả các hiệu sẽ kh ra.
  //     // this.profileService.loadAllDistrict(province).subscribe(() => {
  //     //   this.districts = [];
  //     //   this.districts = this.profileService.getAllDistrict();

  //     //   const district = this.createPostForm.get('district_name')?.value;
  //     //   this.profileService.loadAllWard(district).subscribe(() => {
  //     //     this.wards = [];
  //     //     this.wards = this.profileService.getAllWard();

  //     //   })
  //     // })
  //   })
  // }

  // getProvinceName() {
  //   const province = this.createPostForm.get('province_name')?.value;

  //   this.loadAllDistrict(province);

  // }

  // loadAllDistrict(province: string) {
  //   this.profileService.loadAllDistrict(province).subscribe(() => {
  //     this.districts = [];
  //     this.districts = this.profileService.getAllDistrict();
  //     // this.dataEditProfile.district_name = this.districts[0];

  //     // this.loadAllWard(this.dataEditProfile.district_name);

  //   })
  // }

  // getDistrictName() {
  //   const district = this.createPostForm.get('district_name')?.value;
  //   this.loadAllWard(district);
  // }

  // loadAllWard(district: string) {
  //   this.profileService.loadAllWard(district).subscribe(() => {
  //     this.wards = [];
  //     this.wards = this.profileService.getAllWard();
  //     // this.dataEditProfile.ward_name = this.wards[0];
  //   })
  // }

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
      const storageRef = ref(this.storage, 'postsImg/' + file.name);
      //sử dụng Firebase Storage để tải lên tệp (file) vào lưu trữ Firebase
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => {
          console.log(error.message);
          resolve();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.listImg.push(downloadURL);
            resolve();
          });
        }
      );
    });
  }

  // chooseFile(event: any) {
  //   this.file = event.target.files[0];
  //   console.log(this.file)
  //   // this.addData();
  // }

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
    this.createPostForm.reset();
    this.file = {};
    this.modalService.closeModalCreatePost();
  }
}
