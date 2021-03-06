import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Credential } from 'src/app/model/credential';
import { CryptingService } from 'src/app/services/crypting.service';
import { CredentialManagerPage } from '../credential-manager/credential-manager.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  lCredentials:Credential[];

  constructor(
    private cryptingSvc:CryptingService,
     private router: Router
    , private modalCtrl: ModalController) {
    cryptingSvc.setSecretKey("hola");
  }

  ngOnInit(){
    this.lCredentials = [];
    let credential:Credential;
    for(let i=1; i <= 10; i++){
      credential = new Credential();
      credential.build(i.toString(), "Nombre "+i, "mmcmmc97@gmail.com"+i, "pw"+i, "www.amazon"+i+".com");
      
      this.lCredentials.push(credential);
    }
  }

  goCredentialDetail(credential:Credential){
    const navigationExtras: NavigationExtras = {
      
      state: {credential: credential}
    };
    this.router.navigate([this.password(credential.title)], navigationExtras);
  }

  password(value: string): string {
    return value.toLocaleLowerCase().replace(" ", "_").replace(/[\{\}\|\\\^\[\]\`\;\/\?\:\@\&\=\+\$\,]/g,'');
  }

  async showManager(credential?:Credential){
    console.log("showManager");
    const modal = await this.modalCtrl.create({
      component: CredentialManagerPage,
      componentProps: {
        credential
      },
      showBackdrop: true,
      mode:	"ios",
      cssClass: 'custom-modals'
    });

    modal.onWillDismiss().then((data)=>{
      console.log(data);
      //custom code
    });

    return await modal.present();
  }
}