import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { user } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CryptingService } from 'src/app/services/crypting.service';
import { LocalStoragedCredentialsService } from 'src/app/services/local-storaged-credentials.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('loginSlide') slide: IonSlides;
  constructor(
    private lsCredentialsSvc:LocalStoragedCredentialsService
    , private authSvc:AuthService
    , private uiSvc:UiService
    , private router:Router
    , private utils:UtilsService
    , public fingerprint: FingerprintAIO
    , private settingsSvc:SettingsService
    , private cryptingSvc:CryptingService
    ) { }
    
  noPwSyncParam:any;
  enabledBioAccess:boolean;
  async ngOnInit(): Promise<void> {
    this.biometricAuth();    
    this.showNumLocalCredentials();
  }
  
  private async showNumLocalCredentials() {
    const $numCreds = this.lsCredentialsSvc.getNumStoragedCredentials();
    await this.lsCredentialsSvc.numStoragedCredential();
    
    $numCreds.subscribe(async numStoragedCredential => {
      console.log("$numCreds.subscribe");      
      const password: string = (await this.utils.trans('pw')).toLowerCase();
      if (numStoragedCredential === 1)
      this.noPwSyncParam = { numCredentials: `1 ${password}` };
      if (numStoragedCredential > 1)
      this.noPwSyncParam = { numCredentials: numStoragedCredential + ` ${password}s` };
    })    
  }

  async ionViewDidEnter() {    
    this.slide?.lockSwipes( true );
  }

  // slideOpts = {
  //   allowSlideNext: false,
  //   allowSlidePrev: false
  // };

  async login(loginForm:NgForm){
    let user:user = {};
    try {
      if(this.enabledBioAccess && !this.fillingForm){
        const title = await this.utils.trans('acceso-biometrico');
        const description = await this.utils.trans('bio-descripcion');
        const cancelButtonTitle = await this.utils.trans('cancelar');
        
        const fingerprintResult = await this.fingerprint.show({ title, description, cancelButtonTitle, disableBackup:true });
        this.uiSvc.showLoading('login-loading');
        if(fingerprintResult === 'biometric_success'){
          const cryptedUser = await this.settingsSvc.getBioAccess();
          const userJson = this.cryptingSvc.decryptData(cryptedUser, environment.cryptingKey);
          user = JSON.parse(userJson);
        }
      } else {        
        this.uiSvc.showLoading('login-loading');
        // loginValues = {username:'miguel', password:'mmmmmm'}
        user.name = loginForm.value.username;
        user.password = loginForm.value.password;
        loginForm.reset();
      }
      await this.authSvc.login(user.name, user.password);
      this.authSuccess(user.password);   
    } catch(e) {
      this.uiSvc.error(e);
    } finally {
      this.uiSvc.hideLoading();
    }
  }

  async register(registerForm:NgForm){    
    try{
      const {username, password, password2} = registerForm.value;
      if(password !== password2) this.uiSvc.error('pw-no-match');
      await this.authSvc.register(username, password);
      registerForm.reset();
      this.authSuccess(password);   
    } catch(e) {
      this.uiSvc.error(e);
    }
  }

  authSuccess(password:string){
    CryptingService.setSecretKey(password);
    this.router.navigateByUrl("");
  }

  showRegister() {
    this.slide.lockSwipes(false);
    this.slide.slideTo(1);
    this.slide.lockSwipes(true);
  }

  showLogin() {
    this.slide.lockSwipes(false);
    this.slide.slideTo(0);
    this.slide.lockSwipes(true);
  }

  async biometricAuth(){
    this.enabledBioAccess = !!(await this.settingsSvc.getBioAccess());

    if(!this.enabledBioAccess) return;

    try {await this.fingerprint.isAvailable();} catch(e){
      console.error(e);
      this.enabledBioAccess = false;
    }
  }

  fillingForm:boolean;
  onFillingForm(formValues:any){
    if(this.enabledBioAccess){
      this.fillingForm = !!(formValues.username + formValues.password);
    }
  }
}