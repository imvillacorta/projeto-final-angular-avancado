import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Fornecedor } from '../models/fornecedor.interface';
import { Endereco } from '../models/endereco.interface';

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

  excluir(id: string) {
    return this.http.delete<any>(
      this.urlApi + 'produtos/' + id, this.obterAuthHeaderJson()
    );
  }

  cadastrarFornecedor(fornecedor: Fornecedor) {
    return this.http.post<Fornecedor>(
      this.urlApi + 'fornecedores', fornecedor, this.obterAuthHeaderJson()
    );
  }

  obterFornecedorPorId(id: string) {
    return this.http.get<any>(
      this.urlApi + 'fornecedores/' + id, this.obterAuthHeaderJson()
    );
  }

  atualizarFornecedor(fornecedor: Fornecedor) {
    return this.http.put<any>(
      this.urlApi + 'fornecedores/' + fornecedor.id, fornecedor, this.obterAuthHeaderJson()
    );
  }

  atualizarEndereco(endereco: Endereco) {
    return this.http.put<any>(
      this.urlApi + 'fornecedores/endereco/' + endereco.id, endereco, this.obterAuthHeaderJson()
    );
  }

}
