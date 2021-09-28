import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  idFornecedor: any = '';
  isEdit: boolean = false;
  isReadOnly: boolean = false;
  form: any = FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.verificarAcao();
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  obterId() {
    this.route
      .paramMap
      .subscribe((params) => {
        this.idFornecedor = params.get('id');
      });
  }

  verificarAcao() {
    if (this.router.url.split('/')[2] === 'editar') {
      this.isEdit = true;
      this.isReadOnly = false;
    }
    if (this.router.url.split('/')[2] === 'visualizar') {
      this.isEdit = false;
      this.isReadOnly = true;
    }
  }

  onSubmit() {

  }

  get nome() {
    return this.form.get('nome');
  }

  get documento() {
    return this.form.get('documento');
  }

  get cep() {
    return this.form.get('cep');
  }

  get logradouro() {
    return this.form.get('logradouro');
  }

  get numero() {
    return this.form.get('numero');
  }

  get complemento() {
    return this.form.get('complemento');
  }

  get bairro() {
    return this.form.get('bairro');
  }

  get cidade() {
    return this.form.get('cidade');
  }

  get estado() {
    return this.form.get('estado');
  }

}
