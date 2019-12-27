import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstandarizadorComponent } from './estandarizador.component';

describe('EstandarizadorComponent', () => {
  let component: EstandarizadorComponent;
  let fixture: ComponentFixture<EstandarizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstandarizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstandarizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
