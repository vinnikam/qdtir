import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionfuncComponent } from './gestionfunc.component';

describe('GestionfuncComponent', () => {
  let component: GestionfuncComponent;
  let fixture: ComponentFixture<GestionfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
