import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { CredentialSettingsPopoverComponent, Option } from 'src/app/components/credential-settings-popover/credential-settings-popover.component';
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
  lFilteredCredentials:Credential[];

  constructor(
    private cryptingSvc:CryptingService
    , private router: Router
    , private modalCtrl: ModalController
    , private popoverController: PopoverController) {
  }

  ngOnInit(){
    this.cryptingSvc.setSecretKey("hola");
    this.lCredentials = [];

    ////
    let credential:Credential;
    credential = new Credential();
    credential.build("1", "spotify", "miguelmartin97@hotmail.com", this.cryptingSvc.encryptData("12345"), "spotify.com");
    this.lCredentials.push(credential);
    credential = new Credential();
    credential.build("1", "spotify2", "miguelmartin97@hotmail2.com", this.cryptingSvc.encryptData("123452"), "spotify2.com");
    this.lCredentials.push(credential);
    for(let i=1; i <= 10; i++){
      credential = new Credential();
      credential.build(i.toString(), "Nombre "+i, "mmcmmc19997@gmail.com"+i, this.cryptingSvc.encryptData("miContrassseña"+i), "www.amazon"+i+".com");
      
      this.lCredentials.push(credential);
    }
    ////
    this.lFilteredCredentials = this.lCredentials;
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
    const modal = await this.modalCtrl.create({
      component: CredentialManagerPage,
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

  showHidePw(credential:Credential, e){
    e.stopPropagation();
    e.preventDefault();
    const show = !credential.options?.show;
    credential.options = {show}
  }

  onSearch(filter:string){
    filter = filter.toLowerCase();
    this.lFilteredCredentials = this.lCredentials.filter(cred => cred.title.toLowerCase().includes(filter) || cred.url.toLowerCase().includes(filter))
  }

  async settingsPopover(credential:Credential, e: any) {
    e.stopPropagation();
    e.preventDefault();
    const popover = await this.popoverController.create({
      component: CredentialSettingsPopoverComponent,
      cssClass: 'popover',
      event: e,
      translucent: true,
      componentProps: {credential}
    });
    popover.onDidDismiss().then(this.onOptionSelected)
    return await popover.present();
  }

  onOptionSelected = (data: any) => { 
    console.log(data);     
      switch(data.data?.option){
        case Option.Modify: {
  
          break;
        }
        case Option.Delete: {
  
          break;
        }
        case Option.CopyPw: {
  
          break;
        }
        case Option.LinkWeb: {
  
          break;
        }
        default: console.log('onOptionSelected', data.option);      
      }
  }
}

