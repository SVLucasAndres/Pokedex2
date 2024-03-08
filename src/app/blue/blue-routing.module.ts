import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BluePage } from './blue.page';

const routes: Routes = [
  {
    path: '',
    component: BluePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BluePageRoutingModule {}
