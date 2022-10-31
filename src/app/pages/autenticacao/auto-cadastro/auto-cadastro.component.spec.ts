import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AutoCadastroComponent } from './auto-cadastro.component';

const dadosUser = {
  data: {
    accessToken: '123',
    userToken: 'ivan'
  }
}

class ComponentTestRoute { }

describe('AutoCadastroComponent', () => {
  let component: AutoCadastroComponent;
  let fixture: ComponentFixture<AutoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoCadastroComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'home', component: ComponentTestRoute
          }
        ]),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${AutoCadastroComponent.prototype.gravarDadosLocalStorage.name}`, () => {

    spyOn(component, 'limparFluxo');

    component.gravarDadosLocalStorage(dadosUser);

    const dados = dadosUser.data;

    expect(component.limparFluxo).toHaveBeenCalled();
  });

  it(`#${AutoCadastroComponent.prototype.onSubmit.name}`, () => {

    component.onSubmit();

    expect(component.submitted).toBeTruthy();

  });

  it(`#${AutoCadastroComponent.prototype.onSubmit.name} 
  form status VALID`, () => {
    // expect(component.form).toHaveBeenCalledTimes(1);


  });

  it(`#${AutoCadastroComponent.prototype.limparFluxo.name}`, () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.limparFluxo();

    expect(component.submitted).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(['/home']);

  });
});
