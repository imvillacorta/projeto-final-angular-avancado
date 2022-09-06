import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MenuFuncionalidadesComponent } from './menu-funcionalidades.component';
import { Router } from '@angular/router';

class ComponentTestRoute { }

describe('MenuFuncionalidadesComponent', () => {
  let component: MenuFuncionalidadesComponent;
  let fixture: ComponentFixture<MenuFuncionalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuFuncionalidadesComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home', component: ComponentTestRoute
          },
          {
            path: 'fornecedores', component: ComponentTestRoute
          },
          {
            path: 'produtos', component: ComponentTestRoute
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
    fixture = TestBed.createComponent(MenuFuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${MenuFuncionalidadesComponent.prototype.inicio.name}`, () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.inicio();
    expect(spy).toHaveBeenCalledWith(['/home']);
  });

  it(`#${MenuFuncionalidadesComponent.prototype.fornecedores.name}`, () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.fornecedores();
    expect(spy).toHaveBeenCalledWith(['/fornecedores']);
  });

  it(`#${MenuFuncionalidadesComponent.prototype.produtos.name}`, () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.produtos();
    expect(spy).toHaveBeenCalledWith(['/produtos']);
  });
});
