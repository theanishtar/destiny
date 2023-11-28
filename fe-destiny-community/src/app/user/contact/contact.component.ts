import { Component, OnInit } from '@angular/core';

import { liquid } from "../../../assets/js/utils/liquidify.js";
// import { tns } from '../../../assets/js/vendor/ti';
import { avatarHexagons } from '../../../assets/js/global/global.hexagons.js';
import { tooltips } from '../../../assets/js/global/global.tooltips.js';
import { popups } from '../../../assets/js/global/global.popups.js';
import { headers } from '../../../assets/js/header/header.js';
import { sidebars } from '../../../assets/js/sidebar/sidebar.js';
import { content } from '../../../assets/js/content/content.js';
import { form } from '../../../assets/js/form/form.utils.js';
import 'src/assets/js/utils/svg-loader.js';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import Swal from 'sweetalert2';
import '../../../assets/toast/main.js';
declare var toast: any;
// 
import { ModalService } from '../service/modal.service';
import { ProfileService } from '../service/profile.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    `../../css/vendor/bootstrap.min.css`,
    `../../css/styles.min.css`,
    `../../css/dark/dark.min.css`,
    `../../css/vendor/simplebar.css`,
    './contact.component.css'
  ]
})

export class ContactComponent implements OnInit{
  public contactForm!: FormGroup;
  ngOnInit() {

    liquid.liquid();
    avatarHexagons.avatarHexagons();
    tooltips.tooltips();
    popups.popup();
    popups.picturePopup();
    headers.headers();
    sidebars.sidebars();
    content.contentTab();
    form.formInput();
    this.createFormContacrt();
  }

  constructor(
    public modalService: ModalService,
    private formbuilder: FormBuilder,
    private profileService: ProfileService
  ) { }

  createFormContacrt() {
    const NAME_PATTERN = /^[\p{L}\s]+$/u;
    this.contactForm = this.formbuilder.group({
      fullname: ['',
        [
          Validators.required,
          Validators.pattern(NAME_PATTERN),
        ]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get contacrFormControl() {
    return this.contactForm.controls;
  }

  sendContact(){
    if(this.contactForm.valid){
      var data = {
        fullname: this.contactForm.get('fullname')!.value,
        email: this.contactForm.get('email')!.value,
        subject: this.contactForm.get('subject')!.value,
        description: this.contactForm.get('description')!.value,
      }
      this.profileService.contactApi(data).subscribe(() => {
        new toast({
          title: 'Thành công!',
          message: 'Phản hồi của bạn đã được gửi đi!!',
          type: 'success',
          duration: 3000,
        });
        this.contactForm.reset();
      })
    }
  }
}
