import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Credential } from 'src/app/model/credential';
import { CryptingService } from 'src/app/services/crypting.service';
import { FirestoreCredentialsService } from 'src/app/services/firestore-credentials.service';
import { LocalStoragedCredentialsService } from 'src/app/services/local-storaged-credentials.service';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-credential-manager',
  templateUrl: './credential-manager.component.html',
  styleUrls: ['./credential-manager.component.scss'],
})
export class CredentialManagerComponent implements OnInit {

  credential:Credential
  mode:Mode;
  eMode = Mode;
  constructor(
    private modalCtrl: ModalController
    , private cryptingSvc:CryptingService
    , private lsCredentialsSvc:LocalStoragedCredentialsService
    , private firestoreCredSvc:FirestoreCredentialsService
    , private utils:UtilsService
  ) { }

  @ViewChild('title') titleField:HTMLIonInputElement ;
  ngOnInit() {
    if(!this.credential){
      this.credential = new Credential();
      this.mode = Mode.New;
    }else{
      if(!this.mode) this.mode = Mode.View;
      this.credential = Credential.copy(this.credential);
      this.utils.wait().then(()=>{
        this.credential.password = this.cryptingSvc.decryptData(this.credential.password);
      });
    }
    
    if(this.mode !== Mode.View) this.utils.wait(700).then(() => this.titleField.setFocus());
  }

  invalidForm:boolean;
  async saveUpdateCredential(form:NgForm){
    this.invalidForm = form.invalid;
    if(this.invalidForm) return;

    // await this.utils.wait();
    if(CryptingService.isSecretKeySetted()){
      this.credential.password = this.cryptingSvc.encryptData(this.credential.password);
      this.firestoreCredSvc.saveUpdate(this.credential);
    } else {
      this.credential.password = this.cryptingSvc.encryptData(this.credential.password, environment.cryptingKey);
      this.lsCredentialsSvc.addLocalCredential(this.credential);
    }
    
    this.dismiss();
  }

  titulo(){
    switch(this.mode){
      case Mode.New: return 'add-credenciales'
      case Mode.View: return 'tus-credenciales'
      case Mode.Edit: return 'actualizar-credenciales'
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

  copying:boolean = false;
  async copy(value:string, msgWord:string){
    if(this.copying) return;
    this.utils.copy(value, msgWord);
    this.copying = true;
    await this.utils.wait(1000);
    this.copying = false;
  }

  decryp = (password:string) => this.cryptingSvc.decryptData(password);
  
}

export enum Mode{
  New,
  View,
  Edit
}