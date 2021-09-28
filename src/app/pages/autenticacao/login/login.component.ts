import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from "../../../models/usuario.interface";

import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = FormGroup;
  submitted: boolean = false;
  usuario!: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.status == 'VALID') {
      this.usuario = Object.assign({}, this.usuario, this.form.value);

      this.autenticacaoService
        .login(this.usuario)
        .subscribe(resp => {
          this.gravarDadosLocalStorage(resp);
        })
    }
  }

  gravarDadosLocalStorage(resp: any) {
    const dados = resp.data;
    localStorage.setItem('token', dados.accessToken);
    localStorage.setItem('user', JSON.stringify(dados.userToken));
    this.limparFluxo();
  }

  limparFluxo() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/home']);
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}
