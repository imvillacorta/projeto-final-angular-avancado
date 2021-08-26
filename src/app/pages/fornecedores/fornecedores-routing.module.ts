import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FornecedoresComponent } from './fornecedores.component';

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
                    // {
                    //     path: 'adicionar',
                    //     component: PerfilAcessoComponent,
                    //     canActivate: [AuthGuard]
                    // }
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
