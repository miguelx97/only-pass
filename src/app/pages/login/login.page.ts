import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CryptingService } from 'src/app/services/crypting.service';
import { LocalStoragedCredentialsService } from 'src/app/services/local-storaged-credentials.service';
import { UiService } from 'src/app/services/ui.service';

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
    , private cryptingSvc:CryptingService
    , private router:Router
    ) { }

  noPwSyncParam:any
  async ionViewDidEnter() {    
    this.slide?.lockSwipes( true );   
    this.syncMsg();
  }

  async syncMsg(){
    const numStoragedCredential = await this.lsCredentialsSvc.numStoragedCredential();
    if(numStoragedCredential === 1) this.noPwSyncParam = {numCredentials: "1 contraseña"}
    if(numStoragedCredential > 1) this.noPwSyncParam = {numCredentials: numStoragedCredential + " contraseñas"}
  }

  // slideOpts = {
  //   allowSlideNext: false,
  //   allowSlidePrev: false
  // };

  async login(loginValues:any){
    try {
      await this.authSvc.login(loginValues.username, loginValues.password);
      this.authSuccess(loginValues.password);   
    } catch(e) {
      this.uiSvc.error(e);
    }
  }

  async register(registerValues:any){    
    try{
      if(registerValues.password !== registerValues.password2) this.uiSvc.error('pw-no-match');
      await this.authSvc.register(registerValues.username, registerValues.password);
      this.authSuccess(registerValues.password);   
    } catch(e) {
      this.uiSvc.error(e);
    }
  }

  authSuccess(password:string){
    this.cryptingSvc.setSecretKey(password);
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
}