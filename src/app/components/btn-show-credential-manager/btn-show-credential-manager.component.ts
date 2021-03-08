import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalService } from 'src/app/services/modal.service';
import { CredentialManagerComponent } from '../credential-manager/credential-manager.component';

@Component({
  selector: 'app-btn-show-credential-manager',
  templateUrl: './btn-show-credential-manager.component.html',
  styleUrls: ['./btn-show-credential-manager.component.scss'],
})
export class BtnShowCredentialManagerComponent {

  constructor(
    private modalSvc: ModalService) { }

  showManager = () => this.modalSvc.showManager();
  

}
