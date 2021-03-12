import { Component, OnInit } from '@angular/core';
import { AboutMeComponent } from 'src/app/components/menu/about-me/about-me.component';
import { ModalService } from 'src/app/services/modal.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(private settingsSvc:SettingsService, private modalSvc: ModalService) { }

  selLang(lang:string){
    this.settingsSvc.saveLanguage(lang);
  }
  
  selTheme(theme:string){
    this.settingsSvc.saveTheme(theme);
  }

  goAboutMe(){
    this.modalSvc.showCommonModal(AboutMeComponent)
  }

}
