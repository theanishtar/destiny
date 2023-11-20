import { Component, OnInit } from '@angular/core';
import { AdminUserdetailService } from '../service/admin-userdetail.service';
import { Router } from '@angular/router';
declare var toast: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`, `../css/home.css`],
})
export class UserDetailComponent implements OnInit {

  userDetail: any = {};

  emailUser: string | null;

  totalReport: number;

  isLoading = true;

  constructor(
    private adminUserdetailService: AdminUserdetailService,
    private routers: Router,
  ) { }

  ngOnInit() {
    this.loadUserDetail();
  }

  actionOnUser(email: string): void {

    if (this.userDetail.ban == false) {
      this.adminUserdetailService.actionOnUser(email).subscribe(() => { })
      new toast({
        title: 'Thành công!',
        message: 'Vô hiệu hóa thành công!',
        type: 'success',
        duration: 1500,
      })
      this.userDetail.ban = true;
    } else {
      this.adminUserdetailService.actionOnUser(email).subscribe(() => { })
      new toast({
        title: 'Thành công!',
        message: 'Kích hoạt thành công!',
        type: 'success',
        duration: 1500,
      })
      this.userDetail.ban = false;
    }
    setTimeout(() => {
      window.location.reload();
    }, 600);
  }

  selectUser(email: string): void {
    localStorage.setItem("userDetailEmail", email);
    setTimeout(() => {
      window.location.reload();
    }, 200);
    this.routers.navigate(['/admin/userdetail']);
  }

  loadUserDetail() {

    this.emailUser = localStorage.getItem("userDetailEmail");

    if (this.emailUser == null) {
      this.routers.navigate(['/admin/usermanament']);
    } else {
      this.adminUserdetailService.loadUserDetail(this.emailUser).subscribe(() => {
        this.userDetail = this.adminUserdetailService.getUserDetail();
        this.totalReport = 0;
        this.totalReport = this.userDetail.listUserSendReports.length;
        this.isLoading = false;
      })
    }

  }
}
