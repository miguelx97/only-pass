import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptingService {

  private static encryptSecretKey:string

  encryptData(toEncrypt:string):string {
    try {
      return CryptoJS.AES.encrypt(toEncrypt, CryptingService.encryptSecretKey).toString();
    } catch (e) {
      console.error(e);
    }
  }

  decryptData(toDecrypt:string):string {
    
    try {
      const bytes = CryptoJS.AES.decrypt(toDecrypt, CryptingService.encryptSecretKey);
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return toDecrypt;
    } catch (e) {
      console.error(e);
    }
  }

  setSecretKey(encryptSecretKey:string){
    CryptingService.encryptSecretKey = encryptSecretKey;
  }
}
