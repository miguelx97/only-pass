import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AboutMeComponent } from './about-me/about-me.component';



@NgModule({
  declarations: [AboutMeComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AboutMeComponent],
})
export class MenuModule { }
