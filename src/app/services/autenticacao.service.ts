import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../models/usuario.interface";
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService extends BaseService {
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  cadastrarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(
      this.urlApi + 'nova-conta', usuario, this.obterHeaderJson()
    );
  }


  login(usuario: Usuario) {

  }

}
