import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Credential } from 'src/app/model/credential';
import { CryptingService } from 'src/app/services/crypting.service';
import { FirestoreCredentialsService } from 'src/app/services/firestore-credentials.service';
import { ModalService } from 'src/app/services/modal.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Mode } from '../credential-manager/credential-manager.component';

@Component({
  selector: 'app-credential-settings-popover',
  templateUrl: './credential-settings-popover.component.html',
  styleUrls: ['./credential-settings-popover.component.scss'],
})
export class CredentialSettingsPopoverComponent {
  
  option = Option;
  credential: Credential;
  
  constructor(
    private popoverController: PopoverController
    , private cryptingSvc:CryptingService
    , private modalSvc: ModalService
    , private firestoreCredSvc: FirestoreCredentialsService
    , private uiSvc: UiService
    , private utils: UtilsService
    ) {}
    
    dismiss(option?:Option){
      this.popoverController.dismiss({option});
    }

  copyPw(){
    this.utils.copy(this.cryptingSvc.decryptData(this.credential.password), "pw", false);
    this.dismiss(Option.CopyPw);
  }

  async openUrl(){
    const { Browser } = Plugins;
    let url = this.credential.url;
    if(!url.startsWith('https://') || !url.startsWith('http://')) url = 'https://' + url.replace('www.', '');
    await Browser.open({ url });
    // this.uiSvc.info('abriendo-url', 1500)
    this.dismiss(Option.LinkWeb);
  }

  async delete(){
    this.dismiss(Option.Delete);
    this.firestoreCredSvc.remove(this.credential)
  }

  update(){
    this.showManager(this.credential);
    this.dismiss(Option.Update);
  }

  showManager = (credential:Credential) => this.modalSvc.showCredentialsManager(credential, Mode.Edit);
}

export enum Option{
  Update,
  Delete,
  CopyPw,
  LinkWeb
}