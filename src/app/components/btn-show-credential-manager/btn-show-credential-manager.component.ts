import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-btn-show-credential-manager',
  templateUrl: './btn-show-credential-manager.component.html',
  styleUrls: ['./btn-show-credential-manager.component.scss'],
})
export class BtnShowCredentialManagerComponent {

  prod:boolean
  constructor(private modalSvc: ModalService) {
    this.prod = environment.production;
  }

  showManager = () => this.modalSvc.showCredentialsManager();
}
