import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Credential } from '../model/credential';
import { AuthService } from './auth.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCredentialsService {

  collection: AngularFirestoreCollection<Credential>

  constructor(
    private firestore:AngularFirestore
    , private uiSvc:UiService
    // , private utils:UtilsService
  ) {
    this.firestoreSettings();
    this.collection = this.firestore.collection("credentials");
  }

  allPasswords:Observable<Credential[]>
  getAll():Observable<Credential[]>{
    try {
      if(!this.allPasswords){       
        const queryCollection: AngularFirestoreCollection<Credential> = this.firestore.collection("credentials"
        , ref => ref.where('ownerId', '==', AuthService.UID).orderBy('title', 'asc')
        );
        this.allPasswords = queryCollection.valueChanges({ idField: 'id'})
      }
      return this.allPasswords;
    } catch(e) {
      this.uiSvc.error(e);
    }
  }

  async saveUpdate(credential:Credential){
    try{
      if(!credential.id) {
        await this.save(credential);
        this.uiSvc.success('cred-saved');
      }
      else {
        await this.update(credential);
        this.uiSvc.success('cred-updated');
      }
    } catch(e) {
      this.uiSvc.error(e);
    }
  }

  async save(credential:Credential){
    const currentDate = new Date();
    // const metadata = {ownerId : AuthService.UID, insertTime: currentDate, lastUpdateTime: new Date()};
    const metadata = {ownerId : AuthService.UID};
    const credentialObj = Object.assign(metadata, credential);
    // await this.utils.wait(1000);
    await this.collection.add(credentialObj);
  }

  async update(credential:Credential){
    // const credentialObj = Object.assign({lastUpdateTime: new Date()}, credential);
      await this.collection.doc(credential.id).update(credential);
  }

  async remove(credential:Credential){
    const confirm = await this.uiSvc.confirm('eliminar', 'eliminar-conf', 'eliminar', {title: credential.title});
    if(!confirm) return;
    try{
        await this.collection.doc(credential.id).delete();
        this.uiSvc.success('cred-deleted');
    } catch(e) {
      this.uiSvc.error(e);
    }
  }

  firestoreSettings(){
    try{
      this.firestore.firestore.settings({ ignoreUndefinedProperties: true })
    } catch(ex) {
      console.log("Firebase ya iniciado");      
    }
  }

  async deleteAll(){
    const lCredentials:Credential[] = await this.getAll().pipe(first()).toPromise();
    await Promise.all(lCredentials.map(async credential => {
      await this.collection.doc(credential.id).delete();
    }));
  }
  
}
