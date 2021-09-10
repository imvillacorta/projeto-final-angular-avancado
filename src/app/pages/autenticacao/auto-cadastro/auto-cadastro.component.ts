import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '@narik/custom-validators';

import { AutenticacaoService } from 'src/app/services/autenticacao.service';

import { Usuario } from "../../../models/usuario.interface";

@Component({
  selector: 'app-auto-cadastro',
  templateUrl: './auto-cadastro.component.html',
  styleUrls: ['./auto-cadastro.component.scss']
})
export class AutoCadastroComponent implements OnInit {

  form: any = FormGroup;
  submitted: boolean = false;
  usuario!: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {

  

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let confirmaSenha = new FormControl('', [Validators.required, CustomValidators.equalTo(senha)]);

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: confirmaSenha
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);

    if (this.form.status == 'VALID') {
      this.usuario = Object.assign({}, this.usuario, this.form.value);
      console.log('usuario', this.usuario);

      this.autenticacaoService.cadastrarUsuario(this.usuario);
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

}
