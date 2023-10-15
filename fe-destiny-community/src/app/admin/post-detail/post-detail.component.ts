import { Component, OnInit } from '@angular/core';
import { AdminPostdetailService } from '../service/admin-postdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: [ `../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class PostDetailComponent implements OnInit{

  postDetail: any = {
    "post_id": 0,
    "user_fullname": "",
    "user_avartar": "",
    "content": "",
    "date_Post": "",
    "product": "",
    "totalInterested": 0,
    "totalShare": 0,
    "totalComment": 0,
    "listPostImages": [
      {
        "link_image": ""
      },
      {
        "link_image": ""
      },
      {
        "link_image": ""
      },
      {
        "link_image": "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA."
      },
      {
        "link_image": "https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/08.jpg?alt=media&token=1027fbbb-43ee-4046-8e13-5640153356ea&_gl=1*17e3a7c*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTg5Ny42MC4wLjA."
      }
    ],
    "listComments": []
  };
  idPost: string | null;

  constructor(
    private adminPostdetailService: AdminPostdetailService,
    private routers: Router,
  ){}

  ngOnInit() {
    this.loadPostDetail();
  }

  selectUser(email: string): void{
    localStorage.setItem("userDetailEmail", email);
    this.routers.navigate(['/admin/userdetail']);
  }

  loadPostDetail(){

    this.idPost = localStorage.getItem("postDetailId");

    if(this.idPost == null){
      this.routers.navigate(['/admin/postmanament']);
    }else{
      this.adminPostdetailService.loadPostDetail(this.idPost).subscribe(() => {
        this.postDetail = this.adminPostdetailService.getPostDetail();
      })
    }

  }

}
