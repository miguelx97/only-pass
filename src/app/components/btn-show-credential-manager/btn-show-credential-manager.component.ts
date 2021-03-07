import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CredentialManagerComponent } from '../credential-manager/credential-manager.component';

@Component({
  selector: 'app-btn-show-credential-manager',
  templateUrl: './btn-show-credential-manager.component.html',
  styleUrls: ['./btn-show-credential-manager.component.scss'],
})
export class BtnShowCredentialManagerComponent {

  constructor(
    private modalCtrl: ModalController) { }

  async showManager(credential?:Credential){
    const modal = await this.modalCtrl.create({
      component: CredentialManagerComponent,
      componentProps: {
        credential
      },
      showBackdrop: true,
      mode:	"ios",
      cssClass: 'custom-modals',
    });

    // modal.onWillDismiss().then((data)=>{
    //   console.log(data);
    //   //custom code
    // });

    return await modal.present();
  }

}
