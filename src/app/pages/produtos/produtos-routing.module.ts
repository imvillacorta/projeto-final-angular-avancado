import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
export class ProdutosRoutingModule { }
