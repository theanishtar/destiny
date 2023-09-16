import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: [`../css/sb-admin-2.min.css`,`../css/home.css`],
})
export class ProfileAdminComponent implements OnInit{
  iconProfile!: HTMLElement;
  imgThumbProfile!: HTMLElement;
  nextBtns!: HTMLElement;
  progress!: HTMLElement;
  formSteps!: HTMLElement;
  progressSteps!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}


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


    this.iconProfile = this.el.nativeElement.querySelector("#tab-profile");
    this.imgThumbProfile = this.el.nativeElement.querySelector("#img-thumb-profile");
    }

  // ngAfterViewInit() {

  //   this.iconProfile = this.el.nativeElement.querySelector("#tab-profile");
  //   this.imgThumbProfile = this.el.nativeElement.querySelector("#img-thumb-profile");

  // }

  openProfile() {
    if (this.iconProfile.classList.contains("hidden")) {
      this.renderer.removeClass(this.iconProfile, "hidden");
      this.renderer.removeClass(this.imgThumbProfile, "col-lg-7");
      this.renderer.addClass(this.imgThumbProfile, "col-lg-10");
      this.renderer.addClass(this.imgThumbProfile, "offset-lg-1");
      setTimeout(() => {
        this.iconProfile.style.opacity = "1";
      }, 0);
    } else {
      this.iconProfile.style.opacity = "0";
      setTimeout(() => {
        this.renderer.addClass(this.iconProfile, "hidden");
        this.renderer.removeClass(this.imgThumbProfile, "col-lg-10");
        this.renderer.removeClass(this.imgThumbProfile, "offset-lg-1");
        this.renderer.addClass(this.imgThumbProfile, "col-lg-7");
      }, 300);
    }
  }

}
