import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

import { RegistrarPage } from './registrar.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonIntlTelInputModule,
    FormsModule,
    IonicModule,
    RegistrarPageRoutingModule
  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}
