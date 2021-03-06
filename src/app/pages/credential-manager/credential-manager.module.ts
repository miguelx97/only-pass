import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CredentialManagerPageRoutingModule } from './credential-manager-routing.module';

import { CredentialManagerPage } from './credential-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CredentialManagerPageRoutingModule
  ],
  declarations: [CredentialManagerPage]
})
export class CredentialManagerPageModule {}
