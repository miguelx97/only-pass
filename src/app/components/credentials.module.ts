import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialManagerComponent } from './credential-manager/credential-manager.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BtnShowCredentialManagerComponent } from './btn-show-credential-manager/btn-show-credential-manager.component';
import { TranslateModule } from '@ngx-translate/core';
import { CredentialSettingsPopoverComponent } from './credential-settings-popover/credential-settings-popover.component';



@NgModule({
  declarations: [CredentialManagerComponent, BtnShowCredentialManagerComponent, CredentialSettingsPopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [CredentialManagerComponent, BtnShowCredentialManagerComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class CredentialsModule { }
