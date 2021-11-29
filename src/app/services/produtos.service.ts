import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Fornecedor } from '../models/fornecedor.interface';
import { Endereco } from '../models/endereco.interface';
import { Produto } from '../models/produto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }


  obterTodos() {
    return this.http.get<any>(
      this.urlApi + 'produtos', this.obterAuthHeaderJson()
    );
  }

  obterFornecedores() {
    return this.http.get<any>(
      this.urlApi + 'fornecedores', this.obterAuthHeaderJson()
    );
  }

  excluir(id: string) {
    return this.http.delete<any>(
      this.urlApi + 'produtos/' + id, this.obterAuthHeaderJson()
    );
  }

  cadastrarProduto(produto: Produto) {
    return this.http.post<Produto>(
      this.urlApi + 'produtos', produto, this.obterAuthHeaderJson()
    );
  }

  obterProdutoPorId(id: string) {
    return this.http.get<any>(
      this.urlApi + 'produtos/' + id, this.obterAuthHeaderJson()
    );
  }

  atualizarProduto(produto: Produto) {
    return this.http.put<any>(
      this.urlApi + 'produtos/' + produto.id, produto, this.obterAuthHeaderJson()
    );
  }

}
