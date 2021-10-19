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
    routeAc: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    let usuarioLogado = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user') || '{}');

    //OBTEM A POSIÇÃO 0 DO ARRAY CRIADO NO ARQUIVO DE ROTAS
    let claim: any = routeAc.data[0];
    //SE USUARIO ESTIVER LOGADO ELE TEM ACESSO AS PAGINAS
    if (!usuarioLogado) {
      this.router.navigate(['/autenticacao/login']);
    }

    if (claim !== undefined) {

      //OBTEM O OBJETO CLAIM CRIADO NO ARQUIVO DE ROTAS
      let objClaim = routeAc.data[0]['claim'];
      if (objClaim) {
        if (!user.claims) {
          this.navegadorAcessoNegado();
        }

        //PROCURA E ARMAZENA A CLAIM CORRESPONDENTE AO NOME CRIADO NO ARQUIVO DE ROTA
        let userClaims = user.claims.find((x: any) => x.type === objClaim.nome);
        if (!userClaims) {
          this.navegadorAcessoNegado();
        }

        //ARMAZENA VALORES DA CLAIN (ADICIONAR / ATUALIZAR / EXCLUIR)
        let valoresClaim = userClaims.value as string;
        //SE NÃO EXISTIR A CLAIM SETADA NA ROTA ELE NÃO DEIXA ENTRAR NA TELA
        if (!valoresClaim.includes(objClaim.valor)) {
          this.navegadorAcessoNegado();
        }
      }
    }

    return true;
  }

  navegadorAcessoNegado() {
    this.router.navigate(['/nao-autorizado']);
  }

}
