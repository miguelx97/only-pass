import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private langKey:string = 'language';
  constructor(private translate: TranslateService) {}

  async saveLanguage(language:string){
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    await Storage.set({key: this.langKey, value: language});
  }

  async applyLanguage() {
    let language = 'es';
    const languageSaved = (await Storage.get({key: this.langKey})).value;

    if(languageSaved)language = languageSaved;
    else{
      const { Device } = Plugins;
      const languageDevice: string = (await Device.getLanguageCode()).value;
      if(!languageDevice?.startsWith('es')) language = 'en';
      await Storage.set({ key: this.langKey, value: language });
    }
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  async saveTheme(theme:string){
    document.body.className = "";
    document.body.classList.add(theme);
    await Storage.set({key: 'theme', value: theme});
  }

  async applyTheme() {
    const themeSaved = (await Storage.get({key: 'theme'})).value;
    if(themeSaved) document.body.classList.toggle(themeSaved);
  }


}
