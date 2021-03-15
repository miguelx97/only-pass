import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private translate: TranslateService) {}

  async saveLanguage(language:string){
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    await Storage.set({key: ESettings.Language, value: language});
  }

  async applyLanguage() {
    let language = 'es';
    const languageSaved = (await Storage.get({key: ESettings.Language})).value;

    if(languageSaved)language = languageSaved;
    else{
      const { Device } = Plugins;
      const languageDevice: string = (await Device.getLanguageCode()).value;
      if(!languageDevice?.startsWith('es')) language = 'en';
      await Storage.set({ key: ESettings.Language, value: language });
    }
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  async saveTheme(theme:string){
    document.body.className = "";
    document.body.classList.add(theme);
    await Storage.set({key: ESettings.Theme, value: theme});
  }

  async saveBioAccess(bio:boolean){
    if(bio) await Storage.set({key: ESettings.BiometricalAccess, value: 'y'});
    else await Storage.remove({key: ESettings.BiometricalAccess});
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