import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptingService {

  private static encryptSecretKey:string

  encryptData(toEncrypt:string, key:string = CryptingService.encryptSecretKey):string {
    try {
      return AES.encrypt(toEncrypt, key).toString();
    } catch (e) {
      console.error(e);
    }
  }

  decryptData(toDecrypt:string, key:string = CryptingService.encryptSecretKey):string {

    try {
      const bytes = AES.decrypt(toDecrypt, key);
      if (bytes.toString()) {
        return bytes.toString(enc.Utf8);
      }
      return toDecrypt;
    } catch (e) {
      console.error(e);
    }
  }

  static setSecretKey(encryptSecretKey:string){
    CryptingService.encryptSecretKey = encryptSecretKey;
  }

  static deleteSecretKey(){
    CryptingService.encryptSecretKey = undefined;
  }

  static isSecretKeySetted():boolean{
    return !!CryptingService.encryptSecretKey;
  }


  encryptCredentials(username:string):string{
    const user = {name:username, password:CryptingService.encryptSecretKey}
    const userJson = JSON.stringify(user);
    return this.encryptData(userJson, environment.cryptingKey);
  }
}
