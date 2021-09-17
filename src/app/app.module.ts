import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from './app.component';
import { RootComponent } from "./components/root/root.component";
import { NaoEncontradoComponent } from './pages/erros/nao-encontrado/nao-encontrado.component';
import { NaoAutorizadoComponent } from './pages/erros/nao-autorizado/nao-autorizado.component';

import { HttpLoadingInterceptor } from './interceptors/http-loading.interceptor';
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
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
