import { Component, OnInit } from '@angular/core';
import { AdminUserdetailService } from '@app/admin/service/admin-userdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-report-detail',
  templateUrl: './user-report-detail.component.html',
  styleUrls: [
    `../../admin/css/sb-admin-2.min.css`,
    `../../admin/css/home.css`
  ]
})
export class UserReportModeratorDetailComponent {

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
      // this.routers.navigate(['/admin/usermanament']);
    }else{
      this.adminUserdetailService.loadPostDetail(this.emailUser).subscribe(() => {
        this.userDetail = this.adminUserdetailService.getUserDetail();
      })
    }

  }
}
