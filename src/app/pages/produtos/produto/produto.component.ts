import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit, AfterViewInit {

  isEdit: boolean = false;
  isReadOnly: boolean = false;
  idProduto: any = '';
  form: any = FormGroup;
  submitted: boolean = false;
  fornecedores: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) { }

  ngOnInit(): void {
    this.montarForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.verificarAcao();
      this.obterFornecedores();
    }, 0);
  }

  montarForm() {
    this.form = this.formBuilder.group({
      fornecedorId: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      valor: ['', Validators.required],
      ativo: ['', Validators.required],
    });
    this.configurarFornecedor();
  }

  configurarFornecedor() {
    this.form.patchValue({
      ativo: true
    })
  }

  obterFornecedores() {
    this.produtosService
      .obterFornecedores()
      .subscribe(resp => {
        this.fornecedores = resp;
      });
  }

  verificarAcao() {
    if (this.router.url.split('/')[2] === 'editar') {
      this.isEdit = true;
      this.isReadOnly = false;
      this.obterId();
      this.obterProduto();
    }
    if (this.router.url.split('/')[2] === 'visualizar') {
      this.isEdit = false;
      this.isReadOnly = true;
      this.obterId();
      this.obterProduto();
      this.bloquearCampos();

    }
  }

  obterId() {
    this.route
      .paramMap
      .subscribe((params) => {
        this.idProduto = params.get('id');
      });
  }

  obterProduto() {
    this.produtosService
      .obterProdutoPorId(this.idProduto)
      .subscribe(produto => {
        // this.preencherForm(fornecedor);
      });
  }

  bloquearCampos() {
    // this.form.disable();
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.form);
  }

  get fornecedorId() {
    return this.form.get('fornecedorId');
  }

  get nome() {
    return this.form.get('nome');
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get imagem() {
    return this.form.get('imagem');
  }

  get valor() {
    return this.form.get('valor');
  }

  get ativo() {
    return this.form.get('ativo');
  }

}
