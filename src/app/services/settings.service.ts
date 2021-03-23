import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';
import { CryptingService } from './crypting.service';
import { AuthService } from './auth.service';
const { Storage, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private translate: TranslateService
    , private cryptingSvc:CryptingService
    , private authSvc:AuthService) {}

  async saveLanguage(language:string){
    await Storage.set({key: ESettings.Language, value: language});
    if(!language){
      const languageDevice: string = (await Device.getLanguageCode()).value;
      if(languageDevice?.startsWith('es')) language = 'es';
      else language = 'en';
    }
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  async applyLanguage() {
    let language = 'es';
    const languageSaved = (await Storage.get({key: ESettings.Language})).value;

    if(languageSaved)language = languageSaved;
    else{
      const languageDevice: string = (await Device.getLanguageCode()).value;
      if(!languageDevice?.startsWith('es')) language = 'en';
      // await Storage.set({ key: ESettings.Language, value: language });
    }
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  async saveTheme(theme:string){
    document.body.className = "";
    if(theme) document.body.classList.add(theme);
    await Storage.set({key: ESettings.Theme, value: theme});
  }

  async saveBioAccess(bio:boolean = true){
    if(bio) {
      const username = this.authSvc.getUser().name;
      const credentials = this.cryptingSvc.encryptCredentials(username);
      await Storage.set({key: ESettings.BiometricalAccess, value: credentials});
    }
    else await Storage.remove({key: ESettings.BiometricalAccess});
  }
  async getBioAccess():Promise<string>{
    return (await Storage.get({key: ESettings.BiometricalAccess})).value;
  }

  async applyTheme() {
    const themeSaved = (await Storage.get({key: ESettings.Theme})).value;
    if(themeSaved) document.body.classList.toggle(themeSaved);
  }

  async readSettings():Promise<any>{
    const settingsMap: {[key: string]: any} = {};
    ESettings.getAll().forEach(async settingKey => {
      settingsMap[settingKey] = (await Storage.get({key: settingKey})).value; 
    })    
    return settingsMap;
  }
}

enum ESettings{
  Language = 'lang',
  Theme = 'theme',
  BiometricalAccess = 'bioAccess'
}
namespace ESettings {
  export function getAll():string[] {
    return Object.values(ESettings).filter(val => typeof val === 'string') as string[];
  }
}