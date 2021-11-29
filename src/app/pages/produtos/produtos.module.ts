import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loading.interceptor';

import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxDropzoneModule } from 'ngx-dropzone';

import { ProdutosComponent } from './produtos.component';
import { ProdutoComponent } from './produto/produto.component';



registerLocaleData(localePt);
@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdutosRoutingModule,
    CurrencyMaskModule,
    NgxDropzoneModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    }
  ]
})
export class ProdutosModule { }
