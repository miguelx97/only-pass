import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Credential } from 'src/app/model/credential';
import { CryptingService } from 'src/app/services/crypting.service';
import { CredentialManagerComponent, Mode } from '../credential-manager/credential-manager.component';

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
    , private modalCtrl: ModalController
    , public alertCtrl: AlertController
    ) {}
    
    dismiss(option?:Option){
      this.popoverController.dismiss({option});
    }


    
    copyPw(){
    const { Clipboard } = Plugins;
    Clipboard.write({
      string: this.cryptingSvc.decryptData(this.credential.password)
    });
    this.dismiss(Option.CopyPw);
  }

  async openUrl(){
    const { Browser } = Plugins;
    let url = this.credential.url;
    if(!url.startsWith('https://') || !url.startsWith('http://')) url = 'https://' + url.replace('www.', '');
    await Browser.open({ url });
    this.dismiss(Option.LinkWeb);
  }

  delete(){
    this.deleteConfirm();
    this.dismiss(Option.Delete);
  }
  
  async deleteConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: `Estás seguro de que quieres borrar ${this.credential.title}`,
      buttons: [
        {text: 'Cancelar', role: 'cancel', cssClass: 'secondary'}, 
        {
          text: 'Eliminar',
          handler: this.deleteConfirmed
        }
      ]
    });
    
    await alert.present();
  }
  
  deleteConfirmed(){
    console.log('deleteConfirmed');
  }

  update(){
    this.showManager(this.credential);
    this.dismiss(Option.Update);
  }

  async showManager(credential?:Credential){
    const modal = await this.modalCtrl.create({
      component: CredentialManagerComponent,
      componentProps: {
        credential,
        mode: Mode.Edit
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

export enum Option{
  Update,
  Delete,
  CopyPw,
  LinkWeb
}