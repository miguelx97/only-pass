import { Injectable } from '@angular/core';
import { Plugins, HapticsImpactStyle } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
const { Clipboard, Haptics, Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private translate:TranslateService
    , private toastController: ToastController
    , private platform: Platform){

  }
  
  trans(msg:string, params?:any, prefix?:string):Promise<string>{
    if(prefix) msg = `${prefix}.${msg}`;
    return this.translate.get(msg, params).pipe(first()).toPromise();
  }

  wait(time:number = 100):Promise<null>{
    return new Promise(resolve => {
      setTimeout(function(){
        // console.log("waited ", time);
        resolve(null);
      }, time);
    });
  }

  async copy(value:string, msgWord:string, vibrate:boolean = true){
    await Clipboard.write({
      string: value
    });

    const translatedMsg = await this.trans(msgWord, null, 'copy');
    const message = `<ion-icon name="clipboard-outline"></ion-icon> ${translatedMsg}`;

    if(vibrate && this.platform.is('capacitor')) Haptics.impact({style: HapticsImpactStyle.Medium});

    await this.toastController.create({
      message
      , duration: 2000
      , cssClass: 'simple'
    }).then(toast => toast.present());
  }

  randomString(length:number):string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&%!?€$@';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 async openUrl(url:string){
  if(!url.startsWith('https://') || !url.startsWith('http://')) url = 'https://' + url.replace('www.', '');
  await Browser.open({ url });
 }
}
