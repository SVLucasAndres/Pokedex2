import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Storage } from '@ionic/storage-angular';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ingreso:any;
  pokemonName:any;
  pokemonID:any;
  pokemonType:any;
  pokemonSprite:any;
  color:any;
  ruta:any;
  constructor(private router:NavController,private alert:AlertController, private loadingCtrl:LoadingController,private api: PokemonService, private db:Firestore, private storage:Storage, private ble:BluetoothSerial) {}
  ngOnInit(){
    this.conect();
  }
  async ingresar() {
    try{
      this.api.getPokemon(this.ingreso).subscribe((async response => {
        this.pokemonName = response.name;
        this.pokemonID = response.id;
        this.pokemonType = response.types[0].type.name;
        this.pokemonSprite = response.sprites.front_default;
        this.showLoading();
         this.ruta = await doc(this.db,'pokemons',this.pokemonName);
	      await setDoc(this.ruta, { type: this.pokemonType});
        this.loadingCtrl.dismiss();
        this.enviar(this.pokemonType);
      }));
    } catch (error) {
      console.log(error);
    }
  }
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
    this.address = this.storage.get("BleUser");
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
