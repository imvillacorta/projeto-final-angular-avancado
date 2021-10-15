import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Fornecedor } from '../models/fornecedor.interface';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }


  obterTodos() {
    return this.http.get<any>(
      this.urlApi + 'fornecedores'
    );
  }

  cadastrarFornecedor(fornecedor: Fornecedor) {
    return this.http.post<Fornecedor>(
      this.urlApi + 'fornecedores', fornecedor, this.obterAuthHeaderJson()
    );
  }

}
