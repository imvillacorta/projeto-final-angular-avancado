import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedoresComponent } from './fornecedores.component';

import { FornecedoresRoutingModule } from "./fornecedores-routing.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loading.interceptor';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { NgBrazil } from 'ng-brazil';
import { SafePipe } from 'src/app/utils/pipes/safe.pipe';
@NgModule({
  declarations: [
    FornecedoresComponent,
    FornecedorComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FornecedoresRoutingModule,
    NgBrazil,
    NgxMaskModule.forRoot()
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
