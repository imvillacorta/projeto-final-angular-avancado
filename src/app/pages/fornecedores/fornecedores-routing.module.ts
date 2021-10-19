import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FornecedoresComponent } from './fornecedores.component';
import { FornecedorComponent } from "./fornecedor/fornecedor.component";
import { AuthOffGuard } from 'src/app/guards/auth-off.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'fornecedores',
                pathMatch: 'full',
            },
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: FornecedoresComponent,
                    },
                    {
                        path: 'adicionar',
                        canActivate: [AuthOffGuard],
                        component: FornecedorComponent,
                        data: [
                            {
                                claim: {
                                    nome: 'Fornecedor',
                                    valor: 'Adicionar'
                                }
                            }
                        ]
                    },
                    {
                        path: 'editar/:id',
                        canActivate: [AuthOffGuard],
                        component: FornecedorComponent,
                        data: [
                            {
                                claim: {
                                    nome: 'Fornecedor',
                                    valor: 'Atualizar'
                                }
                            }
                        ]
                    },
                    {
                        path: 'visualizar/:id',
                        component: FornecedorComponent
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
export class FornecedoresRoutingModule { }
