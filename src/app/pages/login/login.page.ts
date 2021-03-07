import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  @ViewChild('loginSlide') slide: IonSlides;
  constructor() { }

  ionViewDidEnter() {
    this.slide?.lockSwipes( true );
  }

  // slideOpts = {
  //   allowSlideNext: false,
  //   allowSlidePrev: false
  // };

  login(values:any){
    console.log(values);
  }

  register(values:any){    
    console.log(values);
  }

  showRegister() {
    console.log("reg");
    
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
