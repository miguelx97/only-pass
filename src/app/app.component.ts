import { Component } from '@angular/core';
import { KeyboardInfo, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private settingsSvc:SettingsService, public platform: Platform) {
    this.settingsSvc.applyLanguage();
    this.settingsSvc.applyTheme();
    this.hideOnKeyBoard();
  }

  hideOnKeyBoard(){
    if(this.platform.is('capacitor')){
      const { Keyboard } = Plugins;
      Keyboard.addListener('keyboardDidShow', () => {
        document.body.classList.add('keyboard-is-open');
      });
  
      Keyboard.addListener('keyboardDidHide', () => {
        document.body.classList.remove('keyboard-is-open');
      });
    }
  }
}

