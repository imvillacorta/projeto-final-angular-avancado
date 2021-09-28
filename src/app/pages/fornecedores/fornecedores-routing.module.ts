import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FornecedoresComponent } from './fornecedores.component';
import { FornecedorComponent } from "./fornecedor/fornecedor.component";

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
                        component: FornecedorComponent
                    },
                    {
                        path: 'editar/:id',
                        component: FornecedorComponent
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
