import { NgModule } from '@angular/core';
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
  exports: [CredentialManagerComponent, BtnShowCredentialManagerComponent]
})
export class CredentialsModule { }
