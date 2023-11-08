import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal

import { ModalService } from '@app/user/service/modal.service';
import { ProfileService } from '@app/user/service/profile.service';
import { FollowsService } from '@app/user/service/follows.service';
import '../../../../assets/toast/main.js';
declare var toast: any;

@Component({
  selector: 'app-suggest-after-register',
  templateUrl: './suggest-after-register.component.html',
  styleUrls: [
    `../../../css/vendor/bootstrap.min.css`,
    `../../../css/styles.min.css`,
    './suggest-after-register.component.css']
})
export class SuggestAfterRegisterComponent implements OnInit {
  listSuggested: any[] = [];
  checkLoadingdata: boolean = true;
  idUserSelected: any[] = [];

  ngOnInit() {
    this.loadDataSuggest();
    // this.checkCheckBox()
  }

  constructor(
    public modalService: ModalService,
    public profileService: ProfileService,
    public followsService: FollowsService
  ) {

  }

  async loadDataSuggest() {
    this.checkLoadingdata = true;
    await new Promise<void>((resolve) => {
      this.followsService.loadDataSuggestRegis().subscribe(() => {
        this.listSuggested = this.followsService.getDataSuggestedRegis();
        this.checkLoadingdata = false;

        resolve();
      });
    });
    // await this.checkCheckBox();
    // Sau khi loadDataSuggest hoàn thành, gọi checkCheckBox
    setTimeout(() => {
      this.checkCheckBox();
    }, 1);
  }


  addFollow() {
    this.modalService.sendNotifyFollow(this.idUserSelected);
    console.warn("this.idUserSelected: " + this.idUserSelected)
    new toast({
      title: 'Thông báo!',
      message: 'Đã theo dõi',
      type: 'success',
      duration: 3000,
    });
    // this.modalService.closeModalSuggest();
    // location.reload();
  }

  checkCheckBox() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let addButton = document.getElementById('addButton') as HTMLButtonElement;;
    // if (addButton) {
      addButton!.disabled = true;
      addButton.classList.add('disabled');
      addButton!.style.cursor = 'no-drop';
    // }
    if (checkboxes) {
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
          if (checkedCheckboxes.length >= 5) {
            addButton!.disabled = false;
            addButton.classList.remove('disabled');
            addButton!.style.cursor = 'pointer'
          }
          else {
            addButton!.disabled = true;
            addButton.classList.add('disabled');
            addButton!.style.cursor = 'no-drop';
          }

          if (checkedCheckboxes) {
            checkedCheckboxes.forEach(checkbox => {
              const userId = checkbox.getAttribute('data-user-id');
              if (userId && !this.idUserSelected.includes(userId)) {
                this.idUserSelected.push(userId);
              }
            });
          }
        });
      });
    }
  }
}
