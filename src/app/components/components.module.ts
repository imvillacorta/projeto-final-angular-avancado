import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuFuncionalidadesComponent } from './menu-funcionalidades/menu-funcionalidades.component';
import { MenuAcoesComponent } from './menu-acoes/menu-acoes.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuFuncionalidadesComponent,
    MenuAcoesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
