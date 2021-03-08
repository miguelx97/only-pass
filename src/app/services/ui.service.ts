import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  constructor(
    private toastController: ToastController
    // , private translate:TranslateService
    , private loadingController: LoadingController
    , public alert: AlertController) { }

  private async toast(message:string, duration:number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
    
/*
  error(error:any): boolean{

    let message:string = "";

    if (typeof error === "string") message = error;
    else message = error.code;

    this.translate.get('err.' + message).subscribe((traducido: string) => {
      if(traducido) this.toast(traducido);  
    });
    return false;
  }

  success(message?:string): boolean{
    if(!message) return true;
    this.translate.get('succ.' + message).subscribe((traducido: string) => {
      if(traducido) this.toast(traducido);
    });
    return true;
  }

  info(message?:string, duration?:number) {
    this.translate.get(message).subscribe((traducido: string) => {
      if(traducido) this.toast(traducido, duration);
    });
  }
  */

  private loadingDialog: HTMLIonLoadingElement;
  async showLoading(msg = 'Un segundo...') {
    this.loadingDialog = await this.loadingController.create({
      message: msg,
      duration: 5000
    });
    await this.loadingDialog.present();
  }

  hideLoading(){
    this.loadingDialog.dismiss();   
  }
  
  async confirm(header:string, confirmBtn:string = 'Aceptar'):Promise<boolean> {
    return new Promise(async resolve => {
      const alert = await this.alert.create({
        header: header,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: confirmBtn,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }
  
  /*
  async modalInfo(msg:string){
    const header:string = await this.translate.get(msg).pipe(first()).toPromise();
    const body:string = await this.translate.get('info.' + msg).pipe(first()).toPromise();
    const alert = await this.alert.create({
      header: header,
      message: body,
      buttons: ['OK']
    });
    alert.present();
  }
  */
}
