import { Component, OnInit } from '@angular/core';
import { AdminUserdetailService } from '../service/admin-userdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls:  [`../css/sb-admin-2.min.css`,`../css/home.css`],
})
export class UserDetailComponent implements OnInit{

  userDetail: any = {};

  emailUser: string | null;

  constructor(
    private adminUserdetailService: AdminUserdetailService,
    private routers: Router,
  ){}

  ngOnInit() {
    this.loadUserDetail();
  }

  selectUser(email: string): void{
    localStorage.setItem("userDetailEmail", email);
    setTimeout(() => {
      window.location.reload();
    }, 200);
    this.routers.navigate(['/admin/userdetail']);
  }

  loadUserDetail(){

    this.emailUser = localStorage.getItem("userDetailEmail");

    if(this.emailUser == null){
      this.routers.navigate(['/admin/usermanament']);
    }else{
      this.adminUserdetailService.loadPostDetail(this.emailUser).subscribe(() => {
        this.userDetail = this.adminUserdetailService.getUserDetail();
      })
    }

  }
}
