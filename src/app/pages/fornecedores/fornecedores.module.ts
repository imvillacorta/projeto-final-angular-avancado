import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedoresComponent } from './fornecedores.component';

import { FornecedoresRoutingModule } from "./fornecedores-routing.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loading.interceptor';



@NgModule({
  declarations: [
    FornecedoresComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    }
  ]
})
export class FornecedoresModule { }
