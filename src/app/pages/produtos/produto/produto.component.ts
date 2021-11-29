import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Produto } from 'src/app/models/produto.interface';
import { ProdutosService } from 'src/app/services/produtos.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
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
  produto!: Produto;
  files: File[] = [];
  imageBase64: any;
  imagemPreview: boolean = false;
  imagens: string = '';
  imgPrevia: string = '';

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
      this.imagens = environment.urlImg;
      this.imagemPreview = true;
      this.obterId();
      this.obterProduto();
    }
    if (this.router.url.split('/')[2] === 'visualizar') {
      this.isEdit = false;
      this.isReadOnly = true;
      this.imagens = environment.urlImg;
      this.imagemPreview = true;
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
        this.preencherForm(produto);
      });
  }

  preencherForm(produto: any) {
    this.imgPrevia = produto.imagem;

    if (this.imgPrevia != '') {
      // CRIAR LOGICA PARA SALVAR IMG ORIGINAL, CONVERTER EM BASE64
    }
    this.form.patchValue({
      id: produto.id,
      fornecedorId: produto.fornecedorId,
      nome: produto.nome,
      descricao: produto.descricao,
      valor: produto.valor,
      ativo: produto.ativo
    });
  }

  bloquearCampos() {
    this.form.disable();
  }

  //ADD IMAGEM AO COMPONENTE DE DROPZONE
  onSelect(event: any) {
    console.log('event', event);
    this.files.push(...event.addedFiles);
    console.log('imgs adds', this.files);
    this.converterImgBase64(this.files);

    if (this.files.length > 1) {
      this.replaceFile();

    }
  }

  //CONVERTE IMAGEM ADD EM BASE 64
  converterImgBase64(file: any) {
    console.log('file recebido', file);
    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    console.log('manipula',);
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    console.log('img ba64', this.imageBase64);
  }

  //TROCA IMAGEM ATUAL PELA NOVA ADD
  replaceFile() {
    this.files.splice(0, 1);
  }

  //REMOVE IMAGEM ADD
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  removerImg() {
    this.imagemPreview = false;
  }

  onSubmit() {
    this.submitted = true;

    this.produto = Object.assign({}, this.produto, this.form.value);
    this.produto.imagem = this.files[0].name;
    this.produto.imagemUpload = this.imageBase64;

    if (this.isEdit) {
      if (this.files.length > 0 && this.form.status == 'VALID') {

        this.produto.id = this.idProduto;

        this.produtosService
          .atualizarProduto(this.produto)
          .subscribe(resp => {
            Swal.fire({
              title: 'Maravilha =)',
              text: "Produto alterado com sucesso.",
              icon: 'success',
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#25bcd2',
              allowOutsideClick: false
            }).then((result) => {
              this.submitted = false;
              this.form.reset();
              this.router.navigate(['/produtos']);
            });
          });
      }
    }

    else {
      if (this.files.length > 0 && this.form.status == 'VALID') {
        this.produtosService
          .cadastrarProduto(this.produto)
          .subscribe(resp => {
            Swal.fire({
              title: 'Maravilha =)',
              text: "Produto cadastrado com sucesso.",
              icon: 'success',
              confirmButtonText: 'ENTENDI',
              confirmButtonColor: '#25bcd2',
              allowOutsideClick: false
            }).then((result) => {
              this.submitted = false;
              this.form.reset();
              this.router.navigate(['/produtos']);
            });
          });
  
      }
  
      console.log(this.form);
    }

    

    console.log(this.produto);

    
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

  get valor() {
    return this.form.get('valor');
  }

  get ativo() {
    return this.form.get('ativo');
  }

}
