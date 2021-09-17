import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutoCadastroComponent } from './auto-cadastro/auto-cadastro.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { HttpLoadingInterceptor } from 'src/app/interceptors/http-loading.interceptor';
@NgModule({
  declarations: [
    AutoCadastroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule,
    HttpClientModule
  ],
  providers: [
    AutenticacaoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    }
  ]
})
export class AutenticacaoModule { }
