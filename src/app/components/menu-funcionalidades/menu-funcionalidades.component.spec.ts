import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFuncionalidadesComponent } from './menu-funcionalidades.component';

describe('MenuFuncionalidadesComponent', () => {
  let component: MenuFuncionalidadesComponent;
  let fixture: ComponentFixture<MenuFuncionalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFuncionalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
