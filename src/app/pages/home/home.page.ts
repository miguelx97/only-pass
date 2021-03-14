import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialSettingsPopoverComponent, Option } from 'src/app/components/credential-settings-popover/credential-settings-popover.component';
import { Credential } from 'src/app/model/credential';
// import { BackgroundService } from 'src/app/services/background.service';
import { CryptingService } from 'src/app/services/crypting.service';
import { FirestoreCredentialsService } from 'src/app/services/firestore-credentials.service';
import { LocalStoragedCredentialsService } from 'src/app/services/local-storaged-credentials.service';
import { ModalService } from 'src/app/services/modal.service';
import { UiService } from 'src/app/services/ui.service';
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
    private popoverController: PopoverController
    , private modalSvc: ModalService
    , private firestoreCredSvc:FirestoreCredentialsService
    , private lsCredentialsSvc:LocalStoragedCredentialsService
    , private uiSvc:UiService
    , private cryptingSvc:CryptingService
    // , private backgroundSvc:BackgroundService
  ) {}

  async ngOnInit(){
    this.lCredentials = this.firestoreCredSvc.getAll();
    this.lFilteredCredentials = this.lCredentials;
    this.syncingLocalPasswords();
    // this.backgroundSvc.lockApp();
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

  onSearch(event:any){
    const filter = event.target.value.toLowerCase();
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

  showManager = (credential:Credential) => this.modalSvc.showCredentialsManager(credential);

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

