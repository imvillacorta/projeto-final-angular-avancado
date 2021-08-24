import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from './app.component';
import { RootComponent } from "./components/root/root.component";
import { NaoEncontradoComponent } from './pages/erros/nao-encontrado/nao-encontrado.component';
import { NaoAutorizadoComponent } from './pages/erros/nao-autorizado/nao-autorizado.component';
@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    NaoEncontradoComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
