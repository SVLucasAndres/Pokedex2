import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PokemonService } from './pokemon.service';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { Storage } from '@ionic/storage';
import { Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(private alert:AlertController, private loadingCtrl:LoadingController,private api: PokemonService, private db:Firestore, private storage:Storage, private ble:BluetoothSerial) { }
  async presentAlert(meserror:any) {
    const alert = await this.alert.create({
      header: meserror,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Conectando...',
      duration: 10000,
      spinner: 'dots'
    });

    loading.present();
  }
  deviceConnected(){
    this.ble.subscribe('/n').subscribe(success=>{
      console.log(success);
    })
  }
  enviar(string:string){
    this.ble.write(string).then(response=>{
      console.log("oky");
    }, error=>{
      this.presentAlert(error);
    })
  }
  address:any;
  async conect(){
    this.showLoading();
    this.address = this.storage.get('BleUser');
    await this.ble.connect(this.address).subscribe(async success =>{
      this.loadingCtrl.dismiss();
      this.deviceConnected();
      this.presentAlert(success);
      this.enviar("APP DE IONIC CONECTADA!");
    },error =>{
      this.presentAlert("Error, no fue posible realizar la conexión");
    });
  }
}
