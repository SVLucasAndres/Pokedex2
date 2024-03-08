import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';  
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; 
@Component({
  selector: 'app-blue',
  templateUrl: './blue.page.html',
  styleUrls: ['./blue.page.scss'],
})
export class BluePage implements OnInit {
  mensaje:any;
  constructor(private storage:Storage,private ble:BluetoothSerial,private router:NavController,private alert:AlertController, private loadingCtrl:LoadingController) { }

  async ngOnInit() {
    await this.storage.create();
    this.ActivarBluetooth();
  }
  async presentAlert(meserror:any) {
    const alert = await this.alert.create({
      header: meserror,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ActivarBluetooth(){
    this.ble.isEnabled().then(response =>{
      this.lista();
    },error=>{
      this.presentAlert(error);
    });
  }
  lista(){
    this.ble.list().then(response =>{
      this.mensaje= response;
    },error=>{
      this.presentAlert(error);
    });
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Conectando...',
      duration: 10000,
      spinner: 'dots'
    });

    loading.present();
  }
  bleuser:any;
  async conect(address:any){
    this.showLoading();
    await this.ble.connect(address).subscribe(async success =>{
      this.loadingCtrl.dismiss();
      this.router.navigateForward('home');
      this.loadingCtrl.dismiss();
      await this.deviceConnected();
      await this.enviar("ADRES");
      await this.storage.set("BleUser", address);
    },error =>{
      this.presentAlert("Error, no fue posible realizar la conexión");
    });
  }
  desconectar(){
    this.ble.disconnect().then(response =>{
      this.presentAlert("Intento de conexión cancelado");
    },error=>{
      this.presentAlert(error);
    });
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

}
