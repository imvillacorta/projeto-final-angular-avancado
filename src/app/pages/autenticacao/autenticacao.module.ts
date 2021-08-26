import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCadastroComponent } from './auto-cadastro/auto-cadastro.component';
import { LoginComponent } from './login/login.component';

import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";


@NgModule({
  declarations: [
    AutoCadastroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule
  ]
})
export class AutenticacaoModule { }
