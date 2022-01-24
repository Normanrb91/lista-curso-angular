import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosFormPageRoutingModule } from './cursos-form-routing.module';

import { CursosFormPage } from './cursos-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CursosFormPageRoutingModule
  ],
  declarations: [CursosFormPage]
})
export class CursosFormPageModule {}
