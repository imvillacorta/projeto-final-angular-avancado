import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-funcionalidades',
  templateUrl: './menu-funcionalidades.component.html',
  styleUrls: ['./menu-funcionalidades.component.scss']
})
export class MenuFuncionalidadesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  inicio() {
    this.router.navigate([
      '/home'
    ])
  }

  fornecedores() {
    this.router.navigate([
      '/fornecedores'
    ])
  }

  produtos() {
    this.router.navigate([
      '/produtos'
    ])
  }

}
