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
    './change-email.component.css',
  ]
})
export class ChangeEmailComponent implements OnInit {
  formStepsNum = 0;
  public ChangeMailForm!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {

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
    this.submitted = true;
    if (this.ChangeMailForm.valid) {
      this.profileService.checkSubmit = true;
      var data = {
        newEmail: this.ChangeMailForm.get("newEmail")!.value,
        password: this.ChangeMailForm.get("password")!.value,
      };

      this.profileService.changeMailApi(data).subscribe(() => {
        this.profileService.closeModalChangeMail();
        this.ChangeMailForm.reset();
      })
    }

  }

}
