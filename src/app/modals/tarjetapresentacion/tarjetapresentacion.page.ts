import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tarjetapresentacion',
  templateUrl: './tarjetapresentacion.page.html',
  styleUrls: ['./tarjetapresentacion.page.scss'],
})
export class TarjetapresentacionPage implements OnInit {
  
  dataparaelmodal;

  constructor(
    public modalController: ModalController,

  ) { }

  ngOnInit() {
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


}
