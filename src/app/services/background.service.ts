import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth.service';
import { CryptingService } from './crypting.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor(private router:Router, private authSvc:AuthService, private platform:Platform) {}

  lockApp(){
    this.platform.pause.subscribe(() => {
      this.router.navigateByUrl('');
      this.authSvc.logout();
      CryptingService.deleteSecretKey();
    });
  }
}
