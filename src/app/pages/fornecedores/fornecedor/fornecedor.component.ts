import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgBrazilValidators } from 'ng-brazil';
import { EstadoBr } from 'src/app/models/estado-br.interface';
import { Fornecedor } from 'src/app/models/fornecedor.interface';
import { CepService } from 'src/app/services/cep.service';
import { EstadosService } from 'src/app/services/estados.service';
import { FornecedoresService } from 'src/app/services/fornecedores.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit, AfterViewInit {

  idFornecedor: any = '';
  isEdit: boolean = false;
  isReadOnly: boolean = false;
  form: any = FormGroup;
  endereco: any = FormGroup;
  submitted: boolean = false;
  estados: any = [];
  fornecedor!: Fornecedor;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private fornecedoresService: FornecedoresService,
    private cepService: CepService,
    private estadosService: EstadosService
  ) { }

  ngOnInit(): void {

    this.verificarAcao();
    this.montarForm();

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.obterEstados();
    }, 0);
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
      tipoFornecedor: 1,
      ativo: true
    })
  }

  obterEstados() {
    this.estadosService.obterEstadosBr()
      .subscribe((resp: EstadoBr) => {
        this.estados = resp;
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
      this.form.controls.documento.setValidators([
        Validators.required, NgBrazilValidators.cpf
      ]);
    }
    else if (tipoFornecedorSelecionado == pessoaJuridica) {
      this.form.controls.documento.setValidators([
        Validators.required, NgBrazilValidators.cnpj
      ]);
    }

    this.form.controls.documento.updateValueAndValidity();

  }

  buscarCep() {
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
            this.populaCamposEndereco(resp);
          }
        });
    }
  }

  populaCamposEndereco(resp: any) {
    this.form.patchValue({
      endereco: {
        logradouro: resp.logradouro,
        bairro: resp.bairro,
        cidade: resp.localidade,
        estado: resp.uf
      }

    })
  }

  onlynumber(evt: any) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.status == 'VALID') {
      this.fornecedor = Object.assign({}, this.fornecedor, this.form.value);

      this.fornecedoresService
        .cadastrarFornecedor(this.fornecedor)
        .subscribe(resp => {
          Swal.fire({
            title: 'Maravilha =)',
            text: "Fornecedor cadastrado com sucesso.",
            icon: 'success',
            confirmButtonText: 'ENTENDI',
            confirmButtonColor: '#25bcd2',
            allowOutsideClick: false
          }).then((result) => {
            this.submitted = false;
            this.form.reset();
            this.router.navigate(['/fornecedores']);
          });
        })
    }
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
