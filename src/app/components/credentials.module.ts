import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialManagerComponent } from './credential-manager/credential-manager.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BtnShowCredentialManagerComponent } from './btn-show-credential-manager/btn-show-credential-manager.component';



@NgModule({
  declarations: [CredentialManagerComponent, BtnShowCredentialManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [CredentialManagerComponent, BtnShowCredentialManagerComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class CredentialsModule { }
