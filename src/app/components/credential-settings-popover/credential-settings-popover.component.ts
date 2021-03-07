import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-credential-settings-popover',
  templateUrl: './credential-settings-popover.component.html',
  styleUrls: ['./credential-settings-popover.component.scss'],
})
export class CredentialSettingsPopoverComponent {

  option = Option;
  constructor(private popoverController: PopoverController) {}
  
  dismiss(option:Option){
    this.popoverController.dismiss({option});
  }

}

export enum Option{
  Modify,
  Delete,
  CopyPw,
  LinkWeb
}