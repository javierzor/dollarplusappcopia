import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';
import {  ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Router} from '@angular/router';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-usereditartarjetaocuenta',
  templateUrl: './usereditartarjetaocuenta.page.html',
  styleUrls: ['./usereditartarjetaocuenta.page.scss'],
})
export class UsereditartarjetaocuentaPage implements OnInit {


  @Input() numero_tarjeta_input;
  @ViewChild(IonModal) modal_errores: IonModal;


  cuentaaa_caracteres: ElementRef<any>;
  cuentas_de_usuario: any;
  tarjetas_de_usuario: any;

  tipo_tarjeta: string = undefined;
  // @ViewChild('cuentaaa_caracteres') myElement: ElementRef;
  @ViewChild('cuentaaa_caracteres') set content(content: ElementRef) {
    if(this.step=='agregacuenta') { // initially setter gets called with undefined
         this.cuentaaa_caracteres = content;
    }
    else{
      this.cuentaaa_caracteres = content;
    }
  }

  public agregarcuenta: FormGroup;
  public agregartarjeta: FormGroup;

  secretKey = "123456&Descryption";
  profileInfo: any = null;
  step: string = 'vercuentas';

  numero_de_cuenta_habilitado_plz; boolean = false;
    minimo_caracteres_numero_cuenta: number = 13;
  maximo_caracteres_numero_cuenta: number = 20;
  bancaria_o_interbancaria: string ='Número de cuenta';
  numero_targeta: number = 0;

  direccion: any;
  informacion_perfil: any;
  data_de_deposito:any = undefined;
  dataparaelmodal;
  que_creara;
  
  constructor(
    private varios: VariosService,
    private modalController: ModalController,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.al_nacer_crear_formualrio_de_cuenta();
    this.al_nacer_crear_formualrio_de_tarjeta();

  }

  ionViewWillEnter(){
    console.log('this.dataparaelmodal',this.dataparaelmodal);
    console.log('this.que_creara',this.que_creara);
    this.AlogearDiferenteTipoCuenta();
    console.log('1');
    if(this.que_creara=='cuenta'){
      this.agregarcuenta.controls['banco_cuenta'].setValue(this.dataparaelmodal.banco_cuenta);
      this.agregarcuenta.controls['numero_cuenta'].setValue(this.dataparaelmodal.numero_cuenta);
      this.agregarcuenta.controls['moneda_cuenta'].setValue(this.dataparaelmodal.moneda_cuenta);
      this.agregarcuenta.controls['apodo_cuenta'].setValue(this.dataparaelmodal.apodo_cuenta);
      this.agregarcuenta.controls['titular_cuenta'].setValue(this.dataparaelmodal.titular_cuenta);


    }

    if(this.que_creara=='tarjeta'){
      this.agregartarjeta.controls['banco_tarjeta'].setValue(this.dataparaelmodal.banco_tarjeta);
      this.agregartarjeta.controls['numero_tarjeta'].setValue(this.dataparaelmodal.numero_tarjeta);
      // this.agregartarjeta.controls['moneda_tarjeta'].setValue(this.dataparaelmodal.moneda_tarjeta);
      this.agregartarjeta.controls['apodo_tarjeta'].setValue(this.dataparaelmodal.apodo_tarjeta);
      this.agregartarjeta.controls['titular_tarjeta'].setValue(this.dataparaelmodal.titular_tarjeta);


    }

    // this.traercuentasytarjetasdeusuario();
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }
  
  dismissyactualiza(data, queagrego) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'respuesta_de_modal': 'actualiza',
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }


  al_nacer_crear_formualrio_de_cuenta(){
    this.agregarcuenta = this.formBuilder.group({
      banco_cuenta: ['', [Validators.required ]],
      numero_cuenta: ['', [Validators.required, Validators.minLength(this.minimo_caracteres_numero_cuenta),Validators.maxLength(this.maximo_caracteres_numero_cuenta)]],
      moneda_cuenta: ['', [Validators.required ]],
      titular_cuenta: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      apodo_cuenta: ['', []],

    });
  }

  al_nacer_crear_formualrio_de_tarjeta(){
    this.agregartarjeta = this.formBuilder.group({
      banco_tarjeta: ['', [Validators.required ]],
      numero_tarjeta: ['', [Validators.required, Validators.minLength(13),Validators.maxLength(19)]],
      titular_tarjeta: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      apodo_tarjeta: ['', []],

    });
  }




  AlogearDiferenteTipoCuenta(){
    this.profileInfo=localStorage.getItem('profileInfo');
  if(this.profileInfo){
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
      if(this.profileInfo&&this.profileInfo.id)
      console.log('profileInfo  PERO EN VISTA Alogear ',this.profileInfo);
      var datamonkeyadmupdateporid = {
        nombre_solicitud:'dollarplusappupdateporid',
        id:this.profileInfo.id
      }
      this.varios.variasfunciones(datamonkeyadmupdateporid).subscribe(async( res: any ) =>{
        console.log(' respuesta monkeyadmupdateporid PERO EN VISTA Alogear ',res);
          localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
          if(res&&res.lastname2){
            this.agregarcuenta.controls['titular_cuenta'].setValue(res.name +' '+ res.lastname +' '+ res.lastname2);
            this.agregartarjeta.controls['titular_tarjeta'].setValue(res.name +' '+ res.lastname +' '+  res.lastname2);

          }
          else{
              this.agregarcuenta.controls['titular_cuenta'].setValue(res.name +' '+  res.lastname);
              this.agregartarjeta.controls['titular_tarjeta'].setValue(res.name +' '+  res.lastname);

          }
          if(res.tipo_cuenta<1){
            this.router.navigate(['login']);
          }
        });


    }
    else{
       this.router.navigate(['login']);
    }



}

IONCHANGEbanco_cuenta(event){

  this.numero_de_cuenta_habilitado_plz=true;
  if(event.target.value=='BCP'||event.target.value=='Interbank'){
    this.bancaria_o_interbancaria='Número de cuenta';
    this.minimo_caracteres_numero_cuenta=14;
    this.maximo_caracteres_numero_cuenta=14;
    this.agregarcuenta.controls['numero_cuenta'].setValidators([Validators.required, Validators.minLength(13),Validators.maxLength(15)]);
    this.agregarcuenta.controls['numero_cuenta'].updateValueAndValidity();

    // this.agregarcuenta.removeControl


  }
  else{
    this.bancaria_o_interbancaria='Número de cuenta interbancario (CCI)';
    this.minimo_caracteres_numero_cuenta=19;
    this.maximo_caracteres_numero_cuenta=19;
    this.agregarcuenta.controls['numero_cuenta'].setValidators([Validators.required, Validators.minLength(20),Validators.maxLength(20)]);
    this.agregarcuenta.controls['numero_cuenta'].updateValueAndValidity();
  }
}

modal_errores_agregar_cuenta(){
  console.log('Form agregarcuenta',this.agregarcuenta);
  this.modal_errores.present();
}

modal_errores_agregar_tarjeta(){
  console.log('Form agregartarjeta',this.agregartarjeta);
  this.modal_errores.present();
}

cerrarmodal_errores(){
  console.log('Form updateusuario1',this.agregarcuenta);
  this.modal_errores.dismiss();
}


paso_a_agregarcuenta(){
  this.AlogearDiferenteTipoCuenta();
  this.step='agregacuenta';
}

paso_a_agregartarjeta(){
  this.AlogearDiferenteTipoCuenta();
  this.step='agregatarjeta';
}


iravercuentas(){
  this.step="vercuentas";
  this.al_nacer_crear_formualrio_de_cuenta();
  this.al_nacer_crear_formualrio_de_tarjeta();

}

// traercuentasytarjetasdeusuario(){

//   var datadollarplustraercuentasytarjetasdeusuario = {
//     nombre_solicitud: 'dollarplustraercuentasytarjetasdeusuario',
//     id_user: this.profileInfo.id,
//   }
//   this.varios.MostrarYOcultarAlertaMono('present');
//   this.varios.variasfunciones(datadollarplustraercuentasytarjetasdeusuario).subscribe(async( res: any ) =>{
//     console.log(' respuesta dollarplustraercuentasytarjetasdeusuario',res);
//     this.varios.MostrarYOcultarAlertaMono('dismiss');
//     this.cuentas_de_usuario=res[0];
//     this.tarjetas_de_usuario=res[1];

//      });
// }


intentodeeditarcuenta(){

  if(this.agregarcuenta.valid){
    console.log('FORMULARIO agregarcuenta',this.agregarcuenta);
  
    var datadollarplusagregarcuentaausuario = {
      nombre_solicitud: 'dollarpluseditarcuentaausuario',
      id: this.dataparaelmodal.id,
      banco_cuenta: this.agregarcuenta.value.banco_cuenta,
      numero_cuenta: this.agregarcuenta.value.numero_cuenta.toString(),
      moneda_cuenta: this.agregarcuenta.value.moneda_cuenta,
      titular_cuenta: this.agregarcuenta.value.titular_cuenta,
      apodo_cuenta: this.agregarcuenta.value.apodo_cuenta,
    }
    this.varios.MostrarYOcultarAlertaMono('present');
    this.varios.variasfunciones(datadollarplusagregarcuentaausuario).subscribe(async( res: any ) =>{
      console.log(' respuesta dollarplusagregarcuentaausuario',res);
      this.varios.MostrarYOcultarAlertaMono('dismiss');
      if(res&&res>0){
        // this.traercuentasytarjetasdeusuario();
        this.step='vercuentas';
        this.al_nacer_crear_formualrio_de_cuenta();
        this.dismissyactualiza(res, 'cuenta')
      }
      else{
        this.dismiss();
        this.varios.presentToast('Sin información que actualizar.');
      }
    });
  }

  else {
    this.varios.presentToast('Verifique la información');
  }

}




encrypt(value : string) : string{
  if(value){
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
}

decrypt(textToDecrypt : string){
  if(textToDecrypt){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}

isNumberKeyAndLength(evt) {

  // console.log('este',this.myElement);
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode < 48 || charCode > 57)
    return false;
  else {
    var len = evt.target.value.length;
    if (len > this.maximo_caracteres_numero_cuenta) {
      return false;
    }

  }
  return true;
}
  

calculadordetipodetarjeta(event){

   var longitud=event.target.value.toString().length;
   var valor=event.target.value.toString();
  console.log('longitud',longitud);
    console.log('valor',valor);

    // switch (longitud==1) {
    //   case (valor==4) :
    //     this.tipo_tarjeta='Visa';
    //   break;
    //   case (valor==3) :
    //     this.tipo_tarjeta='JBC';
    //   break;
    //   default:
    //     this.tipo_tarjeta=undefined;
    //   break;
    // }

    // switch (longitud==2) {
    //   case (valor==34) :
    //     this.tipo_tarjeta='American Express';
    //   break;
    //   case (valor==37) :
    //     this.tipo_tarjeta='American Express';
    //   break;
    //   default:
    //     this.tipo_tarjeta=undefined;
    //   break;
    // }


  if(longitud){

    if(longitud==0||longitud<1){
      this.tipo_tarjeta=undefined;
    }

    else if(longitud==1)
    {
      console.log('tiene un solo caracter');
      if(valor==4){
        this.tipo_tarjeta='Visa';
      }
      else if (valor==3){
        this.tipo_tarjeta='JCB';
      }
      else {
        this.tipo_tarjeta=undefined;
      }
    }
    else if (longitud==2){
      if(valor==34){
        this.tipo_tarjeta='American Express';
      }
      else if (valor==37){
        this.tipo_tarjeta='American Express';
      }
      else if (valor==50){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==51){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==52){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==53){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==54){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==55){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==56){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==57){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==58){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==59){
        this.tipo_tarjeta='MasterCard';
      }
      else if (valor==36){
        this.tipo_tarjeta='Diners Club';
      }
      else if (valor==38){
        this.tipo_tarjeta='Diners Club';
      }
    
      else {
      }
    }
    else if (longitud==3){
      if (valor==300){
        this.tipo_tarjeta='Diners Club';
      }
      else if (valor==301){
        this.tipo_tarjeta='Diners Club';
      }
      else if (valor==302){
        this.tipo_tarjeta='Diners Club';
      }
      else if (valor==303){
        this.tipo_tarjeta='Diners Club';
      }
      else if (valor==304){
        this.tipo_tarjeta='Diners Club';
      }
      else if (valor==305){
        this.tipo_tarjeta='Diners Club';
      }
      else {
      }
    }
    else if (longitud==4){
      if (valor==6011){
        this.tipo_tarjeta='Discover';
      }
      else if (valor==2123){
        this.tipo_tarjeta='JCB';
      }
      else if (valor==1800){
        this.tipo_tarjeta='JCB';
      }
      else {
      }
    }
  }

  else {
    this.tipo_tarjeta=undefined;

  }
  
}

filtrodecaracteresnumerotarjeta(evt){
  var charCode = (evt.which) ? evt.which : evt.keyCode
  var len = evt.target.value.length;
  if ( charCode > 47 && charCode < 58 && len<18) {

      return true;
    }
    else{
      return false;

    }
  
}

intentodeeditartarjeta(){

  if(this.agregartarjeta.valid){
    console.log('FORMULARIO agregarcuenta',this.agregartarjeta);
  
    var datadollarplusagregartarjetaausuario = {
      nombre_solicitud: 'dollarpluseditartarjetaausuario',
      id: this.dataparaelmodal.id,
      banco_tarjeta: this.agregartarjeta.value.banco_tarjeta,
      numero_tarjeta: this.agregartarjeta.value.numero_tarjeta.toString(),
      moneda_tarjeta: this.agregartarjeta.value.moneda_tarjeta,
      titular_tarjeta: this.agregartarjeta.value.titular_tarjeta,
      apodo_tarjeta: this.agregartarjeta.value.apodo_tarjeta,
    }
    this.varios.MostrarYOcultarAlertaMono('present');
    this.varios.variasfunciones(datadollarplusagregartarjetaausuario).subscribe(async( res: any ) =>{
      console.log(' respuesta dollarplusagregartarjetaausuario',res);
      this.varios.MostrarYOcultarAlertaMono('dismiss');
      if(res&&res>0){
        // this.traercuentasytarjetasdeusuario();
        this.step='vercuentas';
        this.al_nacer_crear_formualrio_de_tarjeta();
        this.dismissyactualiza(res, 'tarjeta')
      }
      else{
        this.dismiss();
        this.varios.presentToast('Sin información que actualizar.');
      }
    });
  }

  else {
    this.varios.presentToast('Verifique la información');
  }

}





}
