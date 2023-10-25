import { Component } from '@angular/core';
import { ProfileService } from '@app/user/service/profile.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: [
    `../../../forgot-password/forgot-password.component.css`,
    './change-email.component.css']
})
export class ChangeEmailComponent {

  constructor(
    public profileService: ProfileService
  ){

  }

  ngOnInit(): void {
    const prevBtns = document.querySelectorAll<HTMLElement>(".btn-prev")!;
    const nextBtns = document.querySelectorAll<HTMLElement>(".btn-next")!;
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll<HTMLElement>(".form-step");
    const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");

    let formStepsNum = 0;

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        alert("hi")
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
        alert("hi")
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
}
