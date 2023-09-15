import { Component } from '@angular/core';

import { ModalService } from '../service/modal.service';
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(
    public modalService: ModalService,
    // public modalRef: MdbModalRef<ModalComponent>
  ) {}
  
  openModal() {
    this.modalService.openModal();
  }
  closeModal() {
    this.modalService.closeModal();
  }
}
