import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@app/user/service/profile.service';
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
      password: ['',[ Validators.required]],
    });
  }

  get changeMailFormControl() {
		return this.ChangeMailForm.controls;
	}
	changeMail() {
    if(this.ChangeMailForm.valid){
      var data = {
				newEmail: this.ChangeMailForm.get("newEmail")!.value,
				password: this.ChangeMailForm.get("password")!.value,
			};
      this.profileService.changeMailApi(data).subscribe(() => {

      })
    }
    // let timerInterval;
		// Swal.fire({
		// 	title: 'Thông báo!',
		// 	html: 'Quá trình sẽ diễn ra trong vài giây!',
		// 	timer: 16000,
		// 	timerProgressBar: true,
		// 	didOpen: () => {
		// 		Swal.showLoading();
		// 	},
		// 	willClose: () => {
		// 		clearInterval(timerInterval);
		// 	},
		// }).then((result) => {
		// 	if (result.dismiss === Swal.DismissReason.timer) {
		// 		console.log('I was closed by the timer');
		// 	}
		// });
  }



  nextStep() {
    const nextBtns = document.querySelectorAll<HTMLElement>(".btn-next")!;
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.formStepsNum++;
        this.updateFormSteps();
        this.updateProgressbar();
      });
    });
  }
  prevStep() {
    const prevBtns = document.querySelectorAll<HTMLElement>(".btn-prev")!;
    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.formStepsNum--;
        this.updateFormSteps();
        this.updateProgressbar();
      });
    });
  }
  updateFormSteps() {
    const prevBtns = document.querySelectorAll<HTMLElement>(".btn-prev")!;
    const nextBtns = document.querySelectorAll<HTMLElement>(".btn-next")!;
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll<HTMLElement>(".form-step");
    const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");
    formSteps.forEach((formStep) => {
      formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });

    formSteps[this.formStepsNum].classList.add("form-step-active");
  }

  updateProgressbar() {
    const prevBtns = document.querySelectorAll<HTMLElement>(".btn-prev")!;
    const nextBtns = document.querySelectorAll<HTMLElement>(".btn-next")!;
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll<HTMLElement>(".form-step");
    const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");
    progressSteps.forEach((progressStep, idx) => {
      if (idx < this.formStepsNum + 1) {
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
