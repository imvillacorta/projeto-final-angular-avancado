import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgBrazilValidators } from 'ng-brazil';
import { CepService } from 'src/app/services/cep.service';

import Swal from 'sweetalert2';
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
  endereco: any = FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private cepService: CepService

  ) { }

  ngOnInit(): void {

    this.verificarAcao();
    this.montarForm();


  }

  montarForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      tipoFornecedor: ['', Validators.required],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', Validators.required],
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      })
    });

    this.configurarFornecedor();
  }

  configurarFornecedor() {
    this.form.patchValue({
      tipoFornecedor: '1',
      ativo: true
    })
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

  trocarValidacaoDocumento() {

    let tipoFornecedorSelecionado = this.form.controls.tipoFornecedor.value;
    const pessoaFisica = '2';
    const pessoaJuridica = '1';

    this.form.controls.documento.clearValidators();

    if (tipoFornecedorSelecionado == pessoaFisica) {
      console.log('pf');

      this.form.controls.documento.setValidators([
        Validators.required, NgBrazilValidators.cpf
      ]);
    }
    else if (tipoFornecedorSelecionado == pessoaJuridica) {
      console.log('pj');
      this.form.controls.documento.setValidators([
        Validators.required, NgBrazilValidators.cnpj
      ]);
    }

    this.form.controls.documento.updateValueAndValidity();

  }

  buscarCep() {
  console.log(this.form);
    if (this.form.controls.endereco.controls.cep.status == 'VALID') {
      this.cepService
        .obterDadosCep(this.form.value.endereco.cep)
        .subscribe(resp => {

          if (resp.erro) {
            Swal.fire({
              icon: 'error',
              title: 'Ops!',
              text: "Este CEP não foi encontrado.",
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#0d6efd',
              allowOutsideClick: false
            });
          }

          else {
            // this.dadosCep = resp;
            // this.populaCamposEndereco();

            console.log(resp);
          }
        }, err => {
          console.error();
        })
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);
  }

  get nome() {
    return this.form.get('nome');
  }

  get tipoFornecedor() {
    return this.form.get('tipoFornecedor');
  }

  get documento() {
    return this.form.get('documento');
  }

  get ativo() {
    return this.form.get('ativo');
  }

  get cep() {
    return this.form.controls.endereco.get('cep');
  }

  get logradouro() {
    return this.form.controls.endereco.get('logradouro');
  }

  get numero() {
    return this.form.controls.endereco.get('numero');
  }

  get complemento() {
    return this.form.controls.endereco.get('complemento');
  }

  get bairro() {
    return this.form.controls.endereco.get('bairro');
  }

  get cidade() {
    return this.form.controls.endereco.get('cidade');
  }

  get estado() {
    return this.form.controls.endereco.get('estado');
  }

}
