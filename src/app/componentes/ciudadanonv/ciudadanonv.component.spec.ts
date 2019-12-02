import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadanonvComponent } from './ciudadanonv.component';

describe('CiudadanonvComponent', () => {
  let component: CiudadanonvComponent;
  let fixture: ComponentFixture<CiudadanonvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiudadanonvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadanonvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
