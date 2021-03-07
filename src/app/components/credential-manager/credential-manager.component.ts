import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Credential } from 'src/app/model/credential';
import { CryptingService } from 'src/app/services/crypting.service';

@Component({
  selector: 'app-credential-manager',
  templateUrl: './credential-manager.component.html',
  styleUrls: ['./credential-manager.component.scss'],
})
export class CredentialManagerComponent implements OnInit {

  credential:Credential
  mode:Mode;
  eMode = Mode;
  constructor(private modalCtrl: ModalController, private cryptingSvc:CryptingService) { }

  ngOnInit() {
    if(!this.credential){
      this.credential = new Credential();
      this.mode = Mode.New;
    }else{
      if(!this.mode) this.mode = Mode.View;
      setTimeout(()=> {
        this.credential.password = this.cryptingSvc.decryptData(this.credential.password);
      }, 100);

    }
  }
  
  // ngAfterViewChecked(){
  //   this.credential.password = "this.cryptingSvc.decryptData(this.credential.password)";
  // }

  titulo(){
    switch(this.mode){
      case Mode.New: return 'Añadir credenciales'
      case Mode.View: return 'Tus credenciales'
      case Mode.Edit: return 'Actualizando credenciales'
    }
  }

  @ViewChild('password') passwordField:HTMLIonInputElement ;
  modify() {
    this.mode = Mode.Edit;
    this.passwordField.setFocus();
  }

  dismiss = () => this.modalCtrl.dismiss();

  cancel(){
    this.mode = Mode.View;
  }
  

}

export enum Mode{
  New,
  View,
  Edit
}