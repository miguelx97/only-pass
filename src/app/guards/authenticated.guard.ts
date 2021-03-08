import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot): boolean {
  
      if(this.authSvc.getCurrentUser()) return true;
      else {this.router.navigateByUrl('login'); return false};
  }
  
}
