import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { HttpClientModule } from '@angular/common/http';

import { AutoCadastroComponent } from './auto-cadastro/auto-cadastro.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';



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
    AutenticacaoService
  ]
})
export class AutenticacaoModule { }
