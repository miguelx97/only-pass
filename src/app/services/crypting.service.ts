import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptingService {

  private static encryptSecretKey:string

  encryptData(toEncrypt:string):string {
    try {
      return AES.encrypt(toEncrypt, CryptingService.encryptSecretKey).toString();
    } catch (e) {
      console.error(e);
    }
  }

  decryptData(toDecrypt:string):string {
    try {
      const bytes = AES.decrypt(toDecrypt, CryptingService.encryptSecretKey);
      if (bytes.toString()) {
        return bytes.toString(enc.Utf8);
      }
      return toDecrypt;
    } catch (e) {
      console.error(e);
    }
  }

  setSecretKey(encryptSecretKey:string){
    CryptingService.encryptSecretKey = encryptSecretKey;
  }

  isSecretKeySetted():boolean{
    return !!CryptingService.encryptSecretKey;
  }
}
