import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //Theo dõi trạng thái của modal
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
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
  updateStatusForm: FormGroup;
  isLoadingStatus: boolean = false;

  ngOnInit() {
    this.loadDataSuggest();
    this.profileService.getCheckData().then((result) => {
      if (result) { }
      this.createFormUpdateStatus();
    });
  }

  constructor(
    public modalService: ModalService,
    public profileService: ProfileService,
    public followsService: FollowsService,
    private cookieService: CookieService,
    private fb: FormBuilder,
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

  checkAdd: boolean = false;
  addFollow() {
    this.modalService.sendNotifyFollow(this.idUserSelected);
    new toast({
      title: 'Thông báo!',
      message: 'Đã theo dõi',
      type: 'success',
      duration: 3000,
    });
    let btn = document.getElementById('btns') as HTMLElement;
    btn.style.display = 'none'
    this.checkAdd = true
    // this.modalService.closeModalSuggest();
    // location.reload();
  }

  checkCheckBox() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let addButton = document.getElementById('addButton') as HTMLButtonElement;;
    if (addButton) {
      addButton!.disabled = true;
      addButton.classList.add('disabled');
      addButton!.style.cursor = 'no-drop';
    }
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

  // update status info
  createFormUpdateStatus() {
    const genderValue = this.profileService.dataProfileTimeline?.gender !== '' ? true : false;
    const locationValue = this.profileService.dataProfileTimeline?.address_fullname !== '' ? true : false;
    const birthdayValue = this.profileService.dataProfileTimeline?.birthday !== '' ? true : false;
  
    this.updateStatusForm = this.fb.group({
      user_id: [''],
      gender: genderValue,
      location: locationValue,
      birthday: birthdayValue
    });
  }
  

  get statusFormControl() {
    return this.updateStatusForm.controls;
  }

  updateStatus(){
    this.isLoadingStatus = true;
    var data = {
      user_id: this.cookieService.get("id"),
      gender: this.updateStatusForm.get('gender')!.value,
      location: this.updateStatusForm.get('location')!.value,
      birthday: this.updateStatusForm.get('birthday')!.value
    }
    // console.warn("data: " + JSON.stringify(data));
    this.profileService.updateStatus(data).subscribe((res) => {
      // console.warn("res: " + res);
      if(res == true){
        new toast({
          title: 'Thành công!',
          message: 'Cập nhật thành công',
          type: 'success',
          duration: 1500,
        });
        this.profileService.closeModalHideInfo();
        this.isLoadingStatus = false;
      }else{
        new toast({
          title: 'Thất bại!',
          message: 'Cập nhật thất bại',
          type: 'error',
          duration: 1500,
        });
        this.isLoadingStatus = false;
      }
    })
  }
}
