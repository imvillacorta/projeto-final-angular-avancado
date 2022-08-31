import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import * as Feather from 'feather-icons';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(Feather, 'replace');
  });

  it('should import icon', () => {

    component.ngAfterViewInit();
    expect(Feather.replace).toHaveBeenCalled();
  });

});
