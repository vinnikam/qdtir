import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentadminComponent } from './autentadmin.component';

describe('AutentadminComponent', () => {
  let component: AutentadminComponent;
  let fixture: ComponentFixture<AutentadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutentadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutentadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
