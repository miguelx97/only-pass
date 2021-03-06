import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CredentialDetailPage } from './credential-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CredentialDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredentialDetailPageRoutingModule {}
