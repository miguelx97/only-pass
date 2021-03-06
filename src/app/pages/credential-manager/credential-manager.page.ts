import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Credential } from 'src/app/model/credential';

@Component({
  selector: 'app-credential-manager',
  templateUrl: './credential-manager.page.html',
  styleUrls: ['./credential-manager.page.scss'],
})
export class CredentialManagerPage implements OnInit {

  credential:Credential
  mode:Mode;
  eMode = Mode;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.credential);
    
    if(!this.credential){
      this.credential = new Credential();
      this.mode = Mode.New;
    }else{
      this.mode = Mode.View;
    }
  }

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

enum Mode{
  New,
  View,
  Edit
}