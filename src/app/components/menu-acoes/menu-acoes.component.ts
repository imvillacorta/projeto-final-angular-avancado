import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-acoes',
  templateUrl: './menu-acoes.component.html',
  styleUrls: ['./menu-acoes.component.scss']
})
export class MenuAcoesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
