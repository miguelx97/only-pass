import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CredentialsModule } from 'src/app/components/credentials.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CredentialsModule,
    SharedModule,
    SharedModule
  ],
  declarations: [LoginPage],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class LoginPageModule {}
