import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptingService {

  private encryptSecretKey:string

  encryptData(toEncrypt:string):string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(toEncrypt), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(toDecrypt:string):string {
    try {
      const bytes = CryptoJS.AES.decrypt(toDecrypt, this.encryptSecretKey);
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return toDecrypt;
    } catch (e) {
      console.log(e);
    }
  }

  setSecretKey(encryptSecretKey:string){
    this.encryptSecretKey = encryptSecretKey;
  }
}
