import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionadminComponent } from './gestionadmin.component';

describe('GestionadminComponent', () => {
  let component: GestionadminComponent;
  let fixture: ComponentFixture<GestionadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
