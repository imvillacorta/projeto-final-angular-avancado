import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../models/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  constructor(
    private httpClient: HttpClient
  ) { }

cadastrarUsuario(usuario: Usuario) {

}

login(usuario: Usuario) {
  
}

}
