import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var toast: any;

import { UserReportedDetailService } from '../service/user-reported-detail.service';

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

  totalReport: number;

  userMail: string | null;

  idUserSend: string | null;

  isLoading = true;

  constructor(
    private userReportedDetailService: UserReportedDetailService,
    private routers: Router,
  ) { }

  ngOnInit() {
    this.loadUserDetail();
  }

  sendToAdmin(): void {
    this.userMail = localStorage.getItem("userDetailEmail");
    this.idUserSend = localStorage.getItem("userSendId");

    if (this.userMail == null || this.idUserSend == null) {
      this.routers.navigate(['/moderator/user-report']);
    } else {

      this.userReportedDetailService.sendToAdmin(this.userMail, this.idUserSend).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Báo cáo đã được gửi đến quản trị viên!',
          type: 'success',
          duration: 1500,
        })
        localStorage.removeItem("userDetailEmail");
        this.routers.navigate(['/moderator/user-report']);
      })
    }
  }

  loadUserDetail() {

    this.emailUser = localStorage.getItem("userDetailEmail");

    if (this.emailUser == null) {
      this.routers.navigate(['/moderator/user-report']);
    } else {
      this.userReportedDetailService.loadUserDetail(this.emailUser).subscribe(() => {
        this.userDetail = this.userReportedDetailService.getUserDetail();
        this.totalReport = 0;
        this.totalReport = this.userDetail.listUserSendReports.length;
        this.isLoading = false;
      })
    }

  }
}
