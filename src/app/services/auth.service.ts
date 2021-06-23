import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ErrorSimple } from '../model/errors';
import { UiService } from './ui.service';
import firebase from 'firebase/app';
import { user as User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:User = {};

  constructor(
    private afAuth:AngularFireAuth
    , private uiSvc:UiService
  ) {}

  async register(username:string, password:string): Promise<boolean> {
      const mail = this.buildMail(username);
      const { user } = await this.afAuth.createUserWithEmailAndPassword(mail, password);
      this.user.uid = user.uid;
      this.user.name = username;
      return this.uiSvc.success('register', {name: username.charAt(0).toUpperCase() + username.slice(1)}, 500);
  }

  async login(username:string, password:string): Promise<boolean>  {
      const mail = this.buildMail(username);      
      const { user } = await this.afAuth.signInWithEmailAndPassword(mail, password);
      this.user.uid = user.uid;
      this.user.name = username;
      return this.uiSvc.success('login', {name: username.charAt(0).toUpperCase() + username.slice(1)}, 500);
  }

  buildMail(username:string):string{
    if(username){
      username = username.trim();
      const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      if(emailRegex.test(username)) return username;
      const validNameRegex = /^([a-zA-Z0-9_\-\.]{3,})$/
      if(validNameRegex.test(username)) return username + '@nomail.com'
    }

    throw new ErrorSimple('invalid-username','el username no cumple la regex');
  }

  // async changePassword(oldPassword:string, newPassword:string){
  //   try{
  //     var user = await this.afAuth.currentUser;
  //     const credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
  //     const userAuth = await user.reauthenticateWithCredential(credentials);
  //   } catch(e) {
  //     this.uiSvc.error(e);      
  //   }
  // }

  async reauthenticate(oldPassword:string){
      var user = await this.afAuth.currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
      await user.reauthenticateWithCredential(credentials);
      return user;
  }

  /**
   * 
   * @param oldPassword Password you were using
   * @param newPassword Password you wanna use
   * @returns 
   */
  async updatePassword(oldPassword:string, newPassword:string): Promise<boolean> {
      const user = await this.reauthenticate(oldPassword);
      await user.updatePassword(newPassword);
      return this.uiSvc.success();
  }

  async deleteAccount(){
    var user = await this.afAuth.currentUser;
    await user.delete();
  }

  async logout(){
    await this.afAuth.signOut();
  }

  getUser(){return this.user}
}