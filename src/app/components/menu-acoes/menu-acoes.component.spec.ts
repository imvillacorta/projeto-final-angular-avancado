import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAcoesComponent } from './menu-acoes.component';

describe('MenuAcoesComponent', () => {
  let component: MenuAcoesComponent;
  let fixture: ComponentFixture<MenuAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
