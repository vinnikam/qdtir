import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireNhistComponent } from './dire-nhist.component';

describe('DireNhistComponent', () => {
  let component: DireNhistComponent;
  let fixture: ComponentFixture<DireNhistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireNhistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireNhistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
