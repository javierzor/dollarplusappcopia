import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalendesarrolloPage } from './modalendesarrollo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalendesarrolloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalendesarrolloPageRoutingModule {}
