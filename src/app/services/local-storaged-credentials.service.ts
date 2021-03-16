import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Credential } from '../model/credential';
import { UiService } from './ui.service';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStoragedCredentialsService {

  private localCredentials:Credential[];
  private storageName = "localCredentials";

  constructor(private uiSvc:UiService) { }

  async loadLocalCredentials(force:boolean = false) {
    if(this.localCredentials && !force) return;
    
    const storagedCredentials = (await Storage.get({key: this.storageName})).value;
    if(storagedCredentials === null) {
      this.localCredentials = [];
    } else {
      this.localCredentials = JSON.parse(storagedCredentials);
    }
  }

  async getLocalCredentials():Promise<Credential[]> {
    await this.loadLocalCredentials();
    return this.localCredentials;
  }

  async addLocalCredential(credential: Credential) {
    try{
      await this.loadLocalCredentials();
      this.localCredentials.push(credential);
      await Storage.set({
        key: this.storageName,
        value: JSON.stringify(this.localCredentials)
      });
      this.encreaseNumStoragedCredentials()
      this.uiSvc.success('add-local-credential', 4000);
    } catch(e){
      this.uiSvc.error(e);
    }
  }

  private $numCredential = new BehaviorSubject(0);
  private numCredential:number;

  async numStoragedCredential():Promise<void> {
    await this.loadLocalCredentials();
    this.numCredential = this.localCredentials?.length || 0;
    this.$numCredential.next(this.numCredential);
  }
  getNumStoragedCredentials = ():BehaviorSubject<number> => {return this.$numCredential};

  encreaseNumStoragedCredentials(num:number = 1):void{
    this.numCredential+=num;
    this.$numCredential.next(this.numCredential);
  }

  clean(){
    Storage.remove({ key: this.storageName })
  }

}
