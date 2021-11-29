import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProdutosService } from 'src/app/services/produtos.service';

import * as Feather from 'feather-icons';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: any = [];
  
  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.obterProdutos();
      Feather.replace();
    }, 0);
  }

  obterProdutos() {
    this.produtosService
      .obterTodos()
      .subscribe(resp => {
        this.produtos = resp;
      });
  }

  editar(id: any) {
    this.router.navigate([
      `/produtos/editar/${id}`,
    ]);
  }

  visualizar(id: any) {
    this.router.navigate([
      `/produtos/visualizar/${id}`,
    ]);
  }

  verificaPermissaoExcluir(id: any) {
    let user = JSON.parse(localStorage.getItem('user') || '{}');

    let claimExcluir = user.claims.find((x: any) => x.type === 'Produto');
    let claimsPermitidas = claimExcluir.value as string

    if (!claimExcluir || !claimsPermitidas.includes('Excluir')) {
      this.router.navigate(['/nao-autorizado']);
      console.log(claimsPermitidas.includes('Excluir'));
    }

    if (claimsPermitidas.includes('Excluir')) {
      this.excluir(id)
    }

  }

  excluir(id: any) {
    Swal.fire({
      title: 'Excluir Produto',
      text: 'Deseja realmente prosseguir com a exclusão?',
      icon: 'question',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (result.dismiss) {
      } else {
        this.produtosService
          .excluir(id)
          .subscribe(resp => {
            Swal.fire({
              title: 'Maravilha =)',
              text: "Produto excluído com sucesso.",
              icon: 'success',
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#25bcd2',
              allowOutsideClick: false
            }).then((result) => {
              this.obterProdutos();
            });
          });
      }

    });
  }

}
