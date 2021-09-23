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
    private fornecedoresService: FornecedoresService
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
        console.log(resp);
      });
  }

}
