import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CredentialManagerPage } from './credential-manager.page';

const routes: Routes = [
  {
    path: '',
    component: CredentialManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredentialManagerPageRoutingModule {}
