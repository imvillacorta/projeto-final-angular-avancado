import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

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

}
