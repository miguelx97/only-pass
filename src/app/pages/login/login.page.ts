import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CryptingService } from 'src/app/services/crypting.service';
import { LocalStoragedCredentialsService } from 'src/app/services/local-storaged-credentials.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('loginSlide') slide: IonSlides;
  constructor(
    private lsCredentialsSvc:LocalStoragedCredentialsService
    , private authSvc:AuthService
    , private uiSvc:UiService
    , private router:Router
    , private utils:UtilsService
    , public faio: FingerprintAIO
    ) { }

  noPwSyncParam:any
  async ionViewDidEnter() {    
    this.slide?.lockSwipes( true );
    this.syncMsg();
  }

  async syncMsg(){
    const numStoragedCredential = await this.lsCredentialsSvc.numStoragedCredential();
    const password:string = (await this.utils.trans('pw')).toLowerCase();
    if(numStoragedCredential === 1) this.noPwSyncParam = {numCredentials: `1 ${password}`}
    if(numStoragedCredential > 1) this.noPwSyncParam = {numCredentials: numStoragedCredential + `${password}s`}
  }

  // slideOpts = {
  //   allowSlideNext: false,
  //   allowSlidePrev: false
  // };

  async login(loginForm:NgForm){
    try {
      // loginValues = {username:'miguel', password:'mmmmmm'}
      const {username, password} = loginForm.value;
      await this.authSvc.login(username, password);
      loginForm.reset();
      this.authSuccess(password);   
    } catch(e) {
      this.uiSvc.error(e);
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
    try{
      const title = await this.utils.trans('Acceso biométrico');
      const description = await this.utils.trans('Escanea tu huella dactilar');
      const cancelButtonTitle = await this.utils.trans('cancelar');
  
      const fingerprintResult = await this.faio.show({ title, description, cancelButtonTitle, disableBackup:true });
      console.log('fingerprintResult ' + fingerprintResult);    
      if(fingerprintResult === 'biometric_success'){
        console.log("HOLAAAAAaa");
      }
    } catch(e){
      console.log('fingerprintResultCatch ' + JSON.stringify(e));
      this.uiSvc.error(e);
    }
  }
}