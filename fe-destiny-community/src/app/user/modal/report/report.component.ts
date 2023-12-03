import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import '../../../../assets/toast/main.js';
declare var toast: any;
import { ReportService } from '@app/user/service/report.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: [
    './report.component.css',
    `../../../css/styles.min.css`,
  
  ]
})
export class ReportComponent {
  public reportPostForm!: FormGroup;
  public reportAccountForm!: FormGroup;
  isLoadingReportUser: boolean = false;
  isLoadingReportPost: boolean = false;

  ngOnInit() {
    this.createFormReportAccount();
    this.createFormReportPost();
  }

  constructor(
    public reportService: ReportService,
    private formbuilder: FormBuilder,
  ) {

  }

  /* ============Report post============= */

  createFormReportPost() {
    this.reportPostForm = this.formbuilder.group({
      content_report: ['', Validators.required],
    });
  }
  get reportPostFormControl() {
    return this.reportPostForm.controls;
  }
  async reportPost() {
    if (this.reportPostForm.valid) {
      this.isLoadingReportPost = true;
      // console.warn("this.idUser: " + this.reportService.getUserId());
      // console.warn("this.reportPostForm.value: " + this.reportPostForm.get('content_report')!.value);
      await this.reportService.reportPostApi(this.reportService.getIdPost(), this.reportPostForm.get('content_report')!.value);
      new toast({
        title: 'Thành công!',
        message: 'Báo cáo của bạn đã được gửi cho kiểm duyệt viên!',
        type: 'success',
        duration: 3000,
      });
      this.reportService.closeReportPost();
      this.reportPostForm.reset();
      this.isLoadingReportPost = false;
    }
  }

  /* ============Report account============= */
  createFormReportAccount() {
    this.reportAccountForm = this.formbuilder.group({
      content_report: ['', Validators.required],
    });
  }
  get reportAccountFormControl() {
    return this.reportAccountForm.controls;
  }

  async reportAccount() {
    if (this.reportAccountForm.valid) {
      this.isLoadingReportUser = true;
      // console.warn("this.idUser: " + this.reportService.getUserId());
      // console.warn("this.reportPostForm.value: " + this.reportAccountForm.get('content_report')!.value);
      await this.reportService.reportAccountApi(this.reportService.getUserId(), this.reportAccountForm.get('content_report')!.value);
      new toast({
        title: 'Thành công!',
        message: 'Báo cáo của bạn đã được gửi cho kiểm duyệt viên!',
        type: 'success',
        duration: 3000,
      });
      this.reportService.closeReportAccount();
      this.reportAccountForm.reset();
      this.isLoadingReportUser = false;
    }
  }
}
