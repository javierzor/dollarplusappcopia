import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalendesarrolloPageRoutingModule } from './modalendesarrollo-routing.module';

import { ModalendesarrolloPage } from './modalendesarrollo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalendesarrolloPageRoutingModule
  ],
  declarations: [ModalendesarrolloPage]
})
export class ModalendesarrolloPageModule {}
