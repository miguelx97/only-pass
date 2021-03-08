import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ErrorSimple } from '../model/errors';
import { User } from '../model/user';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth:AngularFireAuth
    , private uiSvc:UiService
  ) {}

  async register(username:string, password:string): Promise<boolean> {
      const mail = this.buildMail(username);
      const { user } = await this.afAuth.createUserWithEmailAndPassword(mail, password);
      return this.uiSvc.success('register', {name: username.charAt(0).toUpperCase() + username.slice(1)}, 1500);
  }

  async login(username:string, password:string): Promise<boolean>  {
      const mail = this.buildMail(username);      
      const { user } = await this.afAuth.signInWithEmailAndPassword(mail, password);
      return this.uiSvc.success('login', {name: username.charAt(0).toUpperCase() + username.slice(1)}, 1500);
  }

  buildMail(username:string):string{
    if(username){
      const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      if(emailRegex.test(username)) return username;
      const validNameRegex = /^([a-zA-Z0-9_\-\.]{3,})$/
      if(validNameRegex.test(username)) return username + '@nomail.com'
    }

    throw new ErrorSimple('invalid-username','el username no cumple la regex');
  }
}