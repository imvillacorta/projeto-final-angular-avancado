import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AutoCadastroComponent } from "./auto-cadastro/auto-cadastro.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'autenticacao',
                pathMatch: 'full',
            },
            {
                path: '',
                children: [
                    {
                        path: 'login',
                        component: LoginComponent,
                    }
                ]
            },
            {
                path: '',
                children: [
                    {
                        path: 'auto-cadastro',
                        component: AutoCadastroComponent,
                    }
                ]
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
