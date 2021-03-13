import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AboutMeComponent } from './about-me/about-me.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AboutMeComponent, ChangePassComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule
  ]
})
export class MenuModule { }
