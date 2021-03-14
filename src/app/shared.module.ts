import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ShowHidePasswordComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ],
  exports: [
    TranslateModule, ShowHidePasswordComponent
  ]
})
export class SharedModule { }
