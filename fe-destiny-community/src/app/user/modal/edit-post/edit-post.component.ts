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
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: [
    `../css/modal.css`,
    './edit-post.component.css',
  ]
})
export class EditPostComponent {
  public createUpdatePostForm!: FormGroup;
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
    this.formUpdatePost();
    this.loadAllProvince();
    // this.loadPosts();
  }

  formUpdatePost() {
    this.createUpdatePostForm = this.formbuilder.group({
      content: ['', Validators.required],
      hash_tag: ['', Validators.required],
      province_name: [''],
      district_name: [''],
      ward_name: [''],
      post_status: ['', Validators.required],
      product: ['', Validators.required],
      post_images: [''],
      post_id: [''],
      send_status: [''],
    });
  }
  get createUpdatePostFormControl() {
    return this.createUpdatePostForm.controls;
  }

  async updatePost(event: any) {
    console.log("this.file.length: " + this.file.length)
    for (let img of this.postService.listImageSources) {
      console.log("this.file.length: " + img.link_image)
    }
    if (this.file.length !== undefined) {
      for (let img of this.file) {
        await this.addData(img);
      }
    }
    // else{
    //   for (let img of this.postService.listImageSources) {
    //     await this.addData(img.link_image);
    //   }
    // }

    var data = {
      content: this.createUpdatePostForm.get('content')?.value,
      hash_tag: this.createUpdatePostForm.get('hash_tag')?.value,
      province_name: this.createUpdatePostForm.get('province_name')?.value,
      district_name: this.createUpdatePostForm.get('district_name')?.value,
      ward_name: this.createUpdatePostForm.get('ward_name')?.value,
      post_status: this.createUpdatePostForm.get('post_status')?.value,
      product: this.createUpdatePostForm.get('product')?.value,
      post_images: this.listImg,
      post_id: this.postService.infoPost.post_id,
      send_status: this.postService.infoPost.send_status,
    };
    console.warn("data: " + JSON.stringify(data));
    this.postService.updatePost(data).subscribe(() => {
      new toast({
        title: 'Thành công!',
        message: 'Chỉnh sửa thành công',
        type: 'success',
        duration: 1500,
      });
      this.profileService.loadDataProfileTimeline(this.postService.infoPost.userId)
      this.postService.closeModalUpdatePost();
    })
  }

  // listPostUdpate: any;

  // loadPostUpdate(idPost) {
  //   try {
  //     this.postService.loadDataUpdate(idPost).subscribe((res) => {
  //       this.listPostUdpate = res;
  //       console.log("this.listPostUdpate: " + this.listPostUdpate);
  //     })
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  /* ============Comboxbox address============= */

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

      const province = this.createUpdatePostForm.get('province_name')?.value;
      this.profileService.loadAllDistrict(province).subscribe(() => {
        this.districts = [];
        this.districts = this.profileService.getAllDistrict();

        const district = this.createUpdatePostForm.get('district_name')?.value;
        this.profileService.loadAllWard(district).subscribe(() => {
          this.wards = [];
          this.wards = this.profileService.getAllWard();

        })
      })
    })
  }

  getProvinceName() {
    const province = this.createUpdatePostForm.get('province_name')?.value;
    this.loadAllDistrict(province);

  }

  loadAllDistrict(province: string) {
    this.profileService.loadAllDistrict(province).subscribe(() => {
      this.districts = [];
      this.districts = this.profileService.getAllDistrict();
      this.dataEditProfile.district_name = this.districts[0];

      this.loadAllWard(this.postService.postUpdate[1]);

    })
  }

  getDistrictName() {
    const district = this.createUpdatePostForm.get('district_name')?.value;
    this.loadAllWard(district);
  }

  loadAllWard(district: string) {
    this.profileService.loadAllWard(district).subscribe(() => {
      this.wards = [];
      this.wards = this.profileService.getAllWard();
      this.postService.postUpdate[3] = this.wards[0];
    })
  }

  /* ============upload Images============= */
  imageSources: any[] = [];

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
listImgTemp:string[] = [];
  deleteImg(event: any, i) {
    // if(this.file.length === undefined){
    //   for (let img of this.postService.listImageSources) {
    //     console.log("this.file.length: " + img.link_image)
    //     this.listImgTemp.push(img.link_image)
    //   }
    //   this.file = this.listImgTemp;
    // }
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
      const storageRef = ref(this.storage, 'postsImg/' +file.name);
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
