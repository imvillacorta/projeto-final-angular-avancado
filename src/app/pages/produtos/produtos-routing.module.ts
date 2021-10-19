import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthOffGuard } from 'src/app/guards/auth-off.guard';


import { ProdutoComponent } from './produto/produto.component';
import { ProdutosComponent } from './produtos.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'produtos',
                pathMatch: 'full',
            },
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: ProdutosComponent,
                    },
                    {
                        path: 'adicionar',
                        canActivate: [AuthOffGuard],
                        component: ProdutoComponent,
                        data: [
                            {
                                claim: {
                                    nome: 'Produto',
                                    valor: 'Adicionar'
                                }
                            }
                        ]
                    },
                    {
                        path: 'editar/:id',
                        canActivate: [AuthOffGuard],
                        component: ProdutoComponent,
                        data: [
                            {
                                claim: {
                                    nome: 'Produto',
                                    valor: 'Atualizar'
                                }
                            }
                        ]
                    },
                    {
                        path: 'visualizar/:id',
                        component: ProdutoComponent
                    }
                ]
            },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule { }
