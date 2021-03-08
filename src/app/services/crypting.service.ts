import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

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

  setSecretKey(encryptSecretKey:string){
    CryptingService.encryptSecretKey = encryptSecretKey;
  }

  isSecretKeySetted():boolean{
    return !!CryptingService.encryptSecretKey;
  }
}
