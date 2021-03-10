import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CryptingService } from '../services/crypting.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(): boolean {
  
    const isKey = CryptingService.isSecretKeySetted();
    // console.log('isKey', isKey);
    
    if(!isKey) this.router.navigateByUrl('login')
    return isKey;
  }
  
}
