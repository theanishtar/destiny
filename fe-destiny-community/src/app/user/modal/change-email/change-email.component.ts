import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@app/user/service/profile.service';
import '../../../../assets/toast/main.js';
declare var toast: any;
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: [
    `../../../forgot-password/forgot-password.component.css`,
    './change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  formStepsNum = 0;
  public ChangeMailForm!: FormGroup;

  ngOnInit(): void {
    // let body = document.getElementById('changeMailForm') as HTMLElement;
    // if (body && !this.profileService.checkSendMail) {
    //   body!.style.display = 'block';
    // }
  }

  constructor(
    public profileService: ProfileService,
    private formbuilder: FormBuilder,
  ) {
    this.createFormChangemail();
  }
  createFormChangemail() {
    this.ChangeMailForm = this.formbuilder.group({
      newEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get changeMailFormControl() {
    return this.ChangeMailForm.controls;
  }
  changeMail() {
    // let body = document.getElementById('changeMailForm') as HTMLElement;
    if (this.ChangeMailForm.valid) {
      var data = {
        newEmail: this.ChangeMailForm.get("newEmail")!.value,
        password: this.ChangeMailForm.get("password")!.value,
      };
      console.log("data: " + JSON.stringify(data));
      // this.nextStep();
      this.profileService.changeMailApi(data).subscribe(() => {
        // this.profileService.checkSendMail = true;
        // if (body && this.profileService.checkSendMail) {
        //   body!.style.display = 'none';
        // }
        this.profileService.closeModalChangeMail();
        this.ChangeMailForm.reset();
        // this.profileService.checkSendMail = false;
      })
    }

  }

}
