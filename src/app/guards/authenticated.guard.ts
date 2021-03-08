import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CryptingService } from '../services/crypting.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private cryptingSvc:CryptingService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot): boolean {
  
    const isKey = this.cryptingSvc.isSecretKeySetted();
    if(!isKey) this.router.navigateByUrl('login')
    return isKey;
  }
  
}
