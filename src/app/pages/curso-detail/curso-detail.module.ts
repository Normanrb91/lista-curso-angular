import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoDetailPageRoutingModule } from './curso-detail-routing.module';

import { CursoDetailPage } from './curso-detail.page';
import { NoimagePipe } from '../../pipes/noimage.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoDetailPageRoutingModule
  ],
  declarations: [CursoDetailPage, NoimagePipe]
})
export class CursoDetailPageModule {}
