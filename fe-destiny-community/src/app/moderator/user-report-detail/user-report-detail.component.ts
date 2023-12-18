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

  iDUser: string | null;

  totalReport: number;

  userId: string | null;

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
    this.userId = localStorage.getItem("userDetailId");
    this.idUserSend = localStorage.getItem("userSendId");

    if (this.userId == null || this.idUserSend == null) {
      this.routers.navigate(['/moderator/user-report']);
    } else {

      this.userReportedDetailService.sendToAdmin(this.userId, this.idUserSend).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Báo cáo đã được gửi đến quản trị viên!',
          type: 'success',
          duration: 1500,
        })
        localStorage.removeItem("userDetailId");
        this.routers.navigate(['/moderator/user-report']);
      })
    }
  }

  deleteUser(): void {
    this.userId = localStorage.getItem("userDetailId");
    this.idUserSend = localStorage.getItem("userSendId");

    if (this.userId == null || this.idUserSend == null) {
      this.routers.navigate(['/moderator/user-report']);
    } else {

      this.userReportedDetailService.deleteUser(this.userId, this.idUserSend).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Báo cáo đã được xóa!',
          type: 'success',
          duration: 3000,
        })
        localStorage.removeItem("userDetailId");
        this.routers.navigate(['/moderator/user-report']);
      })
    }
  }

  loadUserDetail() {

    this.iDUser = localStorage.getItem("userDetailId");

    if (this.iDUser == null) {
      this.routers.navigate(['/moderator/user-report']);
    } else {
      this.userReportedDetailService.loadUserDetail(this.iDUser).subscribe(() => {
        this.userDetail = this.userReportedDetailService.getUserDetail();
        this.totalReport = 0;
        this.totalReport = this.userDetail.listUserSendReports.length;
        this.isLoading = false;
      })
    }

  }
}
