import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CredentialDetailPageRoutingModule } from './credential-detail-routing.module';

import { CredentialDetailPage } from './credential-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CredentialDetailPageRoutingModule
  ],
  declarations: [CredentialDetailPage]
})
export class CredentialDetailPageModule {}
