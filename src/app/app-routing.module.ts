import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from "./components/root/root.component";
import { NaoEncontradoComponent } from './pages/erros/nao-encontrado/nao-encontrado.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'home',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/home/home.module').then(
            m => m.HomeModule
          )
      },
      {
        path: 'fornecedores',
        loadChildren: () =>
          import('./pages/fornecedores/fornecedores.module').then(
            m => m.FornecedoresModule
          )
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./pages/produtos/produtos.module').then(
            m => m.ProdutosModule
          )
      },
      {
        path: 'autenticacao',
        loadChildren: () =>
          import('./pages/autenticacao/autenticacao.module').then(
            m => m.AutenticacaoModule
          )
      },
      {
        path: 'nao-encontrado',
        component: NaoEncontradoComponent
      },
      {
        path: '**',
        component: NaoEncontradoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
