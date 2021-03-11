import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private translate: TranslateService) {}

  async setLanguage() {
    let language = 'es';
    const languageSaved = (await Storage.get({key: 'language'})).value;

    if(languageSaved)language = languageSaved;
    else{
      const { Device } = Plugins;
      const languageDevice: string = (await Device.getLanguageCode()).value;
      if(!languageDevice?.startsWith('es')) language = 'en';
      await Storage.set({ key: 'language', value: language });
    }
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  async setTheme() {
    const themeSaved = (await Storage.get({key: 'theme'})).value;
    if(themeSaved) document.body.classList.toggle(themeSaved);
  }


}
