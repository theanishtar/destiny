import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    `../css/vendor/bootstrap.min.css`,
    `../css/styles.min.css`,
    './forgot-password.component.css'
  ]
})
export class ForgotPasswordComponent implements OnInit{
  ngOnInit(): void {
    const prevBtns = document.querySelectorAll<HTMLElement>(".btn-prev");
    const nextBtns = document.querySelectorAll<HTMLElement>(".btn-next");
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll<HTMLElement>(".form-step");
    const progressSteps = document.querySelectorAll<HTMLElement>(".progress-step");

    let formStepsNum = 0;

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
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
}
