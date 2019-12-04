import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Descuento1Component } from './descuento1.component';

describe('Descuento1Component', () => {
  let component: Descuento1Component;
  let fixture: ComponentFixture<Descuento1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Descuento1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Descuento1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
