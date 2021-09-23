import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        let usuarioLogado = localStorage.getItem('token');
        //SE USUARIO ESTIVER LOGADO ACESSOS AO LOGIN E AUTO CADASTRO NÃO SERA PERMITIDA
        if (usuarioLogado) {
            this.router.navigate(['/home']);
        }
        
        return true;
    }

    

}