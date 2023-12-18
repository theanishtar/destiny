import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
declare var toast: any;
import '../../assets/toast/main.js';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgotpasswordService } from '@app/service/forgotpassword.service';
import { data } from 'jquery';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    `../css/vendor/bootstrap.min.css`,
    `../css/styles.min.css`,
    './forgot-password.component.css'
  ]
})
export class ForgotPasswordComponent implements OnInit {
  public emailForm!: FormGroup;
  public validCodeForm!: FormGroup;
  public changePassForm!: FormGroup;
  email: any;

  public checkForm1:boolean = false;
  public checkForm2:boolean = false;
  public checkForm3:boolean = false;

  ngOnInit(): void {

    const prevBtns = document.querySelectorAll<HTMLElement>(".btn-prev");
    const nextBtns = document.querySelectorAll<HTMLElement>(".btn-next");
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll<HTMLElement>(".form-step");
    const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");

    let formStepsNum = 0;

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("formStepsNum: " + formStepsNum)
        
        if (formStepsNum == 0) {
          this.checkMailForgotPass().subscribe((result) => {
            if (formStepsNum == 0 && result === 'success') {
              formStepsNum++;
              updateFormSteps();
              updateProgressbar();
            }
          });
        }
        else if (formStepsNum == 1) {
          this.checkValidCode().subscribe((result) => {
            if (formStepsNum == 1 && result === 'success') {
              formStepsNum++;
              updateFormSteps();
              updateProgressbar();
            }
          });
        }
        else {
          this.changePass().subscribe((result) => {
            if (formStepsNum == 2 && result === 'success') {
              formStepsNum++;
              updateFormSteps();
              updateProgressbar();
            }
          });
        }
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
      });
    });

    function updateFormSteps() {
      formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
          formStep.classList.remove("form-step-active");
      });

      formSteps[formStepsNum].classList.add("form-step-active");
    }

    function updateProgressbar() {
      progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
          progressStep.classList.add("progress-step-active");
        } else {
          progressStep.classList.remove("progress-step-active");
        }
      });

      const progressActive = document.querySelectorAll<HTMLElement>(
        ".progress-step-active"
      );

      progress.style.width =
        ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
    }
  }

  constructor(
    private formbuilder: FormBuilder,
    public forgotpasswordService: ForgotpasswordService
  ) {
    this.createFormEmail();
    this.createFormValidCode();
    this.createFormChangePass();
  }

  createFormEmail() {
    this.emailForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get emailFormControl() {
    return this.emailForm.controls;
  }

  checkMailForgotPass(): Observable<string | null> {
    this.checkForm1 = true;
    if (this.emailForm.valid) {
      this.forgotpasswordService.checkLoading = true;
      return this.forgotpasswordService.sendMail(this.emailForm.get('email')?.value).pipe(
        map((res) => {
          let data = JSON.stringify(res);
          let formattedData = data.substring(2, data.length - 2);
          this.email = this.emailForm.get('email')?.value;
          
          this.emailForm.reset()
          return formattedData;
        }),
      );
    }
    return of(null);
  }

  createFormValidCode() {
    this.validCodeForm = this.formbuilder.group({
      code: ['', Validators.required],
    });
  }
  get validCodeFormControl() {
    return this.validCodeForm.controls;
  }

  checkValidCode(): Observable<string | null> {
    this.checkForm2 = true;
    if (this.validCodeForm.valid) {
      this.forgotpasswordService.checkLoading = true;
      var data = {
        email: this.email,
        code: this.validCodeForm.get('code')?.value,
        pass:''
      }
      console.log("data: " + JSON.stringify(data));
      return this.forgotpasswordService.checkCodeMail(data).pipe(
        map((res) => {
          let data = JSON.stringify(res);
          let formattedData = data.substring(2, data.length - 2);
          return formattedData;
        })
      );
    }
    return of(null);
  }

  createFormChangePass() {
    const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{4,20}$/;
    this.changePassForm = this.formbuilder.group({
      pass: ['',
        [
          Validators.required,
          Validators.pattern(PASSWORD_PATTERN),
        ]],
      reNewPass: ['', Validators.required],
    });
  }
  get changePassFormControl() {
    return this.changePassForm.controls;
  }


  changePass(): Observable<string | null> {
    this.checkForm3 = true;
    if (this.changePassForm.valid) {
      this.forgotpasswordService.checkLoading = true;
      var data = {
        email: this.email,
        code: '',
        pass: this.changePassForm.get("pass")?.value
      }
      console.log("data: " + JSON.stringify(data));
      if (this.changePassForm.get("pass")!.value == this.changePassForm.get("reNewPass")!.value) {
        return this.forgotpasswordService.changePassword(data).pipe(
          map((res) => {
            let data = JSON.stringify(res);
            let formattedData = data.substring(2, data.length - 2);
            return formattedData;
          })
        );
      } else {
        new toast({
          title: 'Thất bại!',
          message: 'Vui lòng kiểm tra lại xác nhận mật khẩu!',
          type: 'error',
          duration: 2000,
        });
      }

    }
    return of(null);
  }
}
