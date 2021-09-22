import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-acoes',
  templateUrl: './menu-acoes.component.html',
  styleUrls: ['./menu-acoes.component.scss']
})
export class MenuAcoesComponent implements OnInit {

  token: any;
  usuario: any;
  email: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  verificaLogin(): boolean {
    this.token = localStorage.getItem('token');
    this.usuario = localStorage.getItem('user');

    if (this.usuario) {
      this.usuario = JSON.parse(this.usuario);
      this.email = this.usuario.email;
    }

    return this.token !== null

  }

  sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate([
      '/autenticacao/login'
    ]);
  }

  login() {
    this.router.navigate([
      '/autenticacao/login'
    ])
  }

  autoCadastro() {
    this.router.navigate([
      '/autenticacao/auto-cadastro'
    ])
  }

}
