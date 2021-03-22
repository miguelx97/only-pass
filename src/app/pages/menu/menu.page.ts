import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AboutMeComponent } from 'src/app/components/menu/about-me/about-me.component';
import { ChangePassComponent } from 'src/app/components/menu/change-pass/change-pass.component';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreCredentialsService } from 'src/app/services/firestore-credentials.service';
import { ModalService } from 'src/app/services/modal.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private settingsSvc:SettingsService
    , private modalSvc: ModalService
    , private uiSvc:UiService
    , private authSvc:AuthService
    , private firestoreCredSvc:FirestoreCredentialsService
    , private router:Router
    , public faio: FingerprintAIO
  ) { }
  
  settingsMap:{[key: string]: any} = {};

  fingerprintAvailable:boolean;
  async ngOnInit() {
    this.settingsMap = await this.settingsSvc.readSettings();
    this.faio.isAvailable().then(result => {
      console.log(result);
      this.fingerprintAvailable = true;

    }).catch(err => {
      console.log(err);
      this.fingerprintAvailable = false;
    });
  }

  selLang(){
    this.settingsSvc.saveLanguage(this.settingsMap.lang);
  }
  
  selTheme(){
    this.settingsSvc.saveTheme(this.settingsMap.theme);
  }

  async setBioAccess(){
    try{
      let change = true;
      if(this.settingsMap.bioAccess) change = await this.uiSvc.confirm('bioaccess-no-seguro', 'bioaccess-no-seguro-msg', 'activar');
      if(change) await this.settingsSvc.saveBioAccess(this.settingsMap.bioAccess);
      else this.settingsMap.bioAccess = false;
    } catch(e){
      this.uiSvc.error(e);
    }
  }

  showAboutMe = () => this.modalSvc.showCommonModal(AboutMeComponent)
  showChangePass = () => this.modalSvc.showCommonModal(ChangePassComponent)
  
  async showDeleteAccount(){
    const res = await this.uiSvc.confirm('borrar-cuenta', 'eliminar-cuenta-msg', 'eliminar');
    if(!res) return;
    try{
      await this.uiSvc.showLoading('eliminando-cuenta')
      await this.firestoreCredSvc.deleteAll();
      await this.authSvc.deleteAccount();
    } catch(e) {
      this.uiSvc.error(e);
    } finally{
      this.uiSvc.hideLoading();
    }
    this.router.navigateByUrl('login');
  }
  

}



