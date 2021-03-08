import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Credential } from '../model/credential';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStoragedCredentialsService {

  private localCredentials:Credential[];

  constructor() {

  }

  private storagedCredentials = async () => (await Storage.get({key: 'localCredentials'})).value;

  async loadLocalCredentials(force:boolean = false) {
    if(this.localCredentials && !force) return;
    const storagedCredentials = await this.storagedCredentials();
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
    await this.loadLocalCredentials();
    this.localCredentials.push(credential);
    await Storage.set({
      key: 'localCredentials',
      value: JSON.stringify(this.localCredentials)
    });
  }

}
