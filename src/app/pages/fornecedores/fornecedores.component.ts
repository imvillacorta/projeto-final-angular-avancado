import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FornecedoresService } from 'src/app/services/fornecedores.service';

import * as Feather from 'feather-icons';
import Swal from 'sweetalert2';


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

  verificaPermissaoExcluir(id: any) {
    let user = JSON.parse(localStorage.getItem('user') || '{}');

    let claimExcluir = user.claims.find((x: any) => x.type === 'Fornecedor');
    if (!claimExcluir || claimExcluir.value !== 'Excluir') {
      this.router.navigate(['/nao-autorizado']);
    }

    if (claimExcluir.value == 'Excluir') {
      this.excluir(id)
    }

  }

  excluir(id: any) {
    Swal.fire({
      title: 'Excluir Fornecedor',
      text: 'Deseja realmente prosseguir com a exclusão?',
      icon: 'question',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (result.dismiss) {
      } else {
        this.fornecedoresService
          .excluir(id)
          .subscribe(resp => {
            Swal.fire({
              title: 'Maravilha =)',
              text: "Fornecedor excluído com sucesso.",
              icon: 'success',
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#25bcd2',
              allowOutsideClick: false
            }).then((result) => {
              this.obterFornecedores();
            });
          });
      }

    });
  }

}
