import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedoresComponent } from './fornecedores.component';

import { FornecedoresRoutingModule } from "./fornecedores-routing.module";



@NgModule({
  declarations: [
    FornecedoresComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule
  ]
})
export class FornecedoresModule { }
