import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CredentialManagerComponent, Mode } from '../components/credential-manager/credential-manager.component';
import { Credential } from '../model/credential';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController) { }

  async showManager(credential?:Credential, mode?:Mode):Promise<HTMLIonModalElement>{    
    const modal = await this.modalCtrl.create({
      component: CredentialManagerComponent,
      componentProps: {
        credential, mode
      },
      showBackdrop: true,
      mode:	"ios",
      cssClass: 'custom-modals',
    });
    await modal.present();
    // modal.onWillDismiss().then((data)=>{
    //   console.log(data);
    //   //custom code
    // });
    return modal;
  }
}
