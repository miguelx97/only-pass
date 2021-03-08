import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PasswordModule } from 'src/app/pipes/password.module';
import { CredentialsModule } from 'src/app/components/credentials.module';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PasswordModule,
    CredentialsModule,
    SharedModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
