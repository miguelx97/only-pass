import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Credential } from '../model/credential';
import { UiService } from './ui.service';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStoragedCredentialsService {

  private localCredentials:Credential[];

  constructor(private uiSvc:UiService) { }

  async loadLocalCredentials(force:boolean = false) {
    if(this.localCredentials && !force) return;
    const storagedCredentials = (await Storage.get({key: 'localCredentials'})).value;
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
        key: 'localCredentials',
        value: JSON.stringify(this.localCredentials)
      });
      this.uiSvc.success('add-local-credential', 4000);
    } catch(e){
      this.uiSvc.error(e);
    }
  }

  async numStoragedCredential():Promise<number> {

    if(this.localCredentials) return this.localCredentials?.length ?? 0;
    console.log("R");
    
    const storagedCredentials = (await Storage.get({key: 'localCredentials'})).value;
    const localCredentials:[] = JSON.parse(storagedCredentials);
    return localCredentials?.length ?? 0;
  }

}
