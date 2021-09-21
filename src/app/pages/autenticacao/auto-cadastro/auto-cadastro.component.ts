import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '@narik/custom-validators';

import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { SenhaValidator } from 'src/app/utils/validators/senha.validator';

import { Usuario } from "../../../models/usuario.interface";

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {

    let senha = new FormControl('',
      [
        Validators.required,
        SenhaValidator.upper,
        SenhaValidator.lower,
        SenhaValidator.number,
        SenhaValidator.caracters,
        CustomValidators.rangeLength([6, 15])
      ]);

    let confirmaSenha = new FormControl('',
      [
        Validators.required,
        CustomValidators.equalTo(senha)
      ]);

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

      this.autenticacaoService
        .cadastrarUsuario(this.usuario)
        .subscribe(resp => {
          Swal.fire({
            title: 'Conta',
            text: "Sua conta foi gerada com sucesso.",
            icon: 'success',
            confirmButtonText: 'ENTENDI',
            confirmButtonColor: '#25bcd2',
            allowOutsideClick: false
          }).then((result) => {
            if (result.dismiss) {
            } else {
              this.submitted = false;
              this.form.reset();
              this.router.navigate(['/autenticacao/login']);
            }
          });
        })
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
