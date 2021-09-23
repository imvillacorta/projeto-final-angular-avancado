import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthOffGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let usuarioLogado = localStorage.getItem('token');
    //SE USUARIO ESTIVER LOGADO ELE TEM ACESSO AS PAGINAS
    if (usuarioLogado) {
      return true;
    }

    //SE NÃO ESTIVER LOGADO
    this.router.navigate(['/home']);
    return false;
  }

}
