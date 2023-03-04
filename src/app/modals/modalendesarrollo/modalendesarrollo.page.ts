import { Component, OnInit } from '@angular/core';
import { VariosService } from '../../service/varios.service';
import { NavParams,ModalController,LoadingController   } from '@ionic/angular';

@Component({
  selector: 'app-modalendesarrollo',
  templateUrl: './modalendesarrollo.page.html',
  styleUrls: ['./modalendesarrollo.page.scss'],
})
export class ModalendesarrolloPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    public varios: VariosService,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.mostrarmonocargando3segundos();
  }


  async mostrarmonocargando3segundos(){
    var loadingmono = await this.loadingController.create({
      duration: 2200,
      message: '<ion-img src="assets/dollarplusrecursos/gif/cargando-colores.gif" alt="loading..."></ion-img>',
      cssClass: 'loading-del-mono',
      spinner: null,
    });
    loadingmono.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }



}
