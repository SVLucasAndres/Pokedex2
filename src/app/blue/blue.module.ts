import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BluePageRoutingModule } from './blue-routing.module';

import { BluePage } from './blue.page';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluePageRoutingModule
  ],
  declarations: [BluePage],
  providers:[BluetoothSerial,Storage]
})
export class BluePageModule {}
