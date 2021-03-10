import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.setLanguage();
  }
  
  private async setLanguage() {
    const { Storage } = Plugins;
    let language = 'es';
    const languageLs = (await Storage.get({key: 'language'})).value;
    if(languageLs){
      language = languageLs;
    } else{
      const { Device } = Plugins;
      const languageDevice: string = (await Device.getLanguageCode()).value;
      if(!languageDevice.startsWith('es')) language = 'en';
      await Storage.set({ key: 'language', value: language });
    }
    console.log(language);
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}
