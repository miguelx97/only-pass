import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mode } from 'src/app/components/credential-manager/credential-manager.component';
import { CredentialSettingsPopoverComponent, Option } from 'src/app/components/credential-settings-popover/credential-settings-popover.component';
import { Credential } from 'src/app/model/credential';
import { CryptingService } from 'src/app/services/crypting.service';
import { FirestoreCredentialsService } from 'src/app/services/firestore-credentials.service';
import { LocalStoragedCredentialsService } from 'src/app/services/local-storaged-credentials.service';
import { ModalService } from 'src/app/services/modal.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  lCredentials:Observable<Credential[]>
  lFilteredCredentials:Observable<Credential[]>

  constructor(
    private router: Router
    , private popoverController: PopoverController
    , private modalSvc: ModalService
    , private firestoreCredSvc:FirestoreCredentialsService
    , private lsCredentialsSvc:LocalStoragedCredentialsService
    , private uiSvc:UiService
    , private cryptingSvc:CryptingService
  ) {}

  async ngOnInit(){
    // this.cryptingSvc.setSecretKey("hola");
    // this.lCredentials = [];

    ////
    // let credential:Credential;
    // credential = new Credential();
    // credential.build("1", "spotify", "miguelmartin97@hotmail.com", this.cryptingSvc.encryptData("12345"), "spotify.com");
    // this.firestoreCredSvc.save(credential);
    // credential = new Credential();
    // credential.build("1", "spotify2", "miguelmartin97@hotmail2.com", this.cryptingSvc.encryptData("123452"), "spotify2.com");
    // this.firestoreCredSvc.save(credential);
    // for(let i=1; i <= 10; i++){
    //   credential = new Credential();
    //   credential.build(i.toString(), "Nombre "+i, "mmcmmc19997@gmail.com"+i, this.cryptingSvc.encryptData("miContrassseña"+i), "www.amazon"+i+".com");
    
    //   this.firestoreCredSvc.save(credential);
    //   console.log("guardando", credential);
    // }
    ////

    this.lCredentials = this.firestoreCredSvc.getAll();
    this.lFilteredCredentials = this.lCredentials;
    this.syncingLocalPasswords();
  }

  private async syncingLocalPasswords() {
    const lSCred = await this.lsCredentialsSvc.getLocalCredentials();
    if (lSCred.length) {
      try {
        // lSCred.forEach(async cred => this.sendingToDb(cred));
        await Promise.all(lSCred.map(async credential => {
          credential.password = this.cryptingSvc.decryptData(credential.password, environment.cryptingKey);
          credential.password = this.cryptingSvc.encryptData(credential.password);
          await this.firestoreCredSvc.save(credential);
        }));      
        this.lsCredentialsSvc.clean();
        this.uiSvc.success("pw-sync");
      } catch (e) {
        this.uiSvc.error(e);
      }
    }
  }
  
  showHidePw(credential:Credential, e){
    e.stopPropagation();
    e.preventDefault();
    const show = !credential.options?.show;
    credential.options = {show}
  }

  onSearch(filter:string){
    filter = filter.toLowerCase();
    this.lFilteredCredentials = this.lCredentials.pipe(
      map(lCred => {
        return lCred.filter(cred => cred.title.toLowerCase().includes(filter) || cred.url?.toLowerCase().includes(filter))
      })
    )
  }

  async settingsPopover(credential:Credential, e: any) {
    e.stopPropagation();
    e.preventDefault();
    const popover = await this.popoverController.create({
      component: CredentialSettingsPopoverComponent,
      cssClass: 'popover',
      event: e,
      translucent: true
      , componentProps: {credential}
    });
    // popover.onDidDismiss().then(this.onOptionSelected)
    return await popover.present();
  }

  showManager = (credential:Credential) => this.modalSvc.showManager(credential);

  goSettings(){
    /*
    Cambiar idioma.
    Cambiar orden.
    Como funciona.
    Sobre la app.
    Sobre el desarrollador.
    */
  }
}

