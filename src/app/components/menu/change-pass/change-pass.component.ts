import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { Credential } from 'src/app/model/credential';
import { ErrorSimple } from 'src/app/model/errors';
import { AuthService } from 'src/app/services/auth.service';
import { CryptingService } from 'src/app/services/crypting.service';
import { FirestoreCredentialsService } from 'src/app/services/firestore-credentials.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent {

  constructor(
    private modalCtrl:ModalController
    , private uiSvc:UiService
    , private authSvc:AuthService
    , private cryptingSvc:CryptingService
    , private firestoreCredSvc:FirestoreCredentialsService
    , private settingsSvc:SettingsService
    ) { }

  invalidForm:boolean = false;
  async changePass(form:NgForm){
    let changedPw:boolean;
    const {oldPw, newPw, newPw2} = form.value;
    try{      
      this.invalidForm = form.invalid;
      if(this.invalidForm) return;
      if(newPw !== newPw2) return this.uiSvc.error('pw-no-match');
      this.uiSvc.showLoading('actualizando-pw');

      changedPw = await this.authSvc.updatePassword(oldPw, newPw);
      if(!changedPw) throw new ErrorSimple('error','Error');

      const lCredentials:Credential[] = await this.firestoreCredSvc.getAll().pipe(first()).toPromise();
      await Promise.all(lCredentials.map(async credential => {
        const oldPw = this.cryptingSvc.decryptData(credential.password);
        credential.password = this.cryptingSvc.encryptData(oldPw, newPw);
        await this.firestoreCredSvc.update(credential);
      }));
      CryptingService.setSecretKey(newPw);
      const bioAccessActivated:boolean = !!(await this.settingsSvc.getBioAccess());
      if(bioAccessActivated) this.settingsSvc.saveBioAccess();
      
      this.dismiss();
      this.uiSvc.success('pw-cambiada')
    } catch(e) {
      this.uiSvc.error(e);
      if(changedPw){
        this.authSvc.updatePassword(newPw, oldPw);
      }
    } finally{
      this.uiSvc.hideLoading();
    }
  }
    

  dismiss = () => this.modalCtrl.dismiss();

}
