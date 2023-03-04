import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisbeneficiosPageRoutingModule } from './misbeneficios-routing.module';

import { MisbeneficiosPage } from './misbeneficios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisbeneficiosPageRoutingModule
  ],
  declarations: [MisbeneficiosPage]
})
export class MisbeneficiosPageModule {}
