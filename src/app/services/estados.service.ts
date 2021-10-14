import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(
    private http: HttpClient
  ) { }

  obterEstadosBr() {
    return this.http.get<EstadoBr>('assets/data/estados-br.json')
      .pipe();
  }
}
