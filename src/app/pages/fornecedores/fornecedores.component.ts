import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FornecedoresService } from 'src/app/services/fornecedores.service';

import * as Feather from 'feather-icons';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  fornecedores: any = [];

  constructor(
    private fornecedoresService: FornecedoresService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.obterFornecedores();
      Feather.replace();
    }, 0);

  }

  obterFornecedores() {
    this.fornecedoresService
      .obterTodos()
      .subscribe(resp => {
        this.fornecedores = resp;
      });
  }

  editar(id: any) {
    this.router.navigate([
      `/fornecedores/editar/${id}`,
    ]);
  }

  visualizar(id: any) {
    this.router.navigate([
      `/fornecedores/visualizar/${id}`,
    ]);
  }

}
