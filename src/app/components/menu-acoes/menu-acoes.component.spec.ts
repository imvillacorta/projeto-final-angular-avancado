import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuAcoesComponent } from './menu-acoes.component';

class ComponentTestRoute { }

describe('MenuAcoesComponent', () => {
  let component: MenuAcoesComponent;
  let fixture: ComponentFixture<MenuAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAcoesComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'autenticacao/login', component: ComponentTestRoute
          },
          {
            path: 'autenticacao/auto-cadastro', component: ComponentTestRoute
          }
        ]),
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it(`#${MenuAcoesComponent.prototype.verificaLogin.name}`, () => {
    component.verificaLogin();

    let token = '123a';
    let usuario = 'ivan';
    localStorage.getItem('token');
    localStorage.getItem('usuario');
  });

  it(`#${MenuAcoesComponent.prototype.verificaLogin.name} if user exist`, () => {
    // TODO: Desenvolver teste unitário
  });

  it(`#${MenuAcoesComponent.prototype.sair.name}`, () => {

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.sair();

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    expect(spy).toHaveBeenCalledWith(['/autenticacao/login']);

  });

  it(`#${MenuAcoesComponent.prototype.login.name}`, () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.login();
    expect(spy).toHaveBeenCalledWith(['/autenticacao/login']);
  });

  it(`#${MenuAcoesComponent.prototype.autoCadastro.name}`, () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.autoCadastro();
    expect(spy).toHaveBeenCalledWith(['/autenticacao/auto-cadastro']);
  });

});
