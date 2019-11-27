/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrediosComponent } from './predios.component';

describe('PrediosComponent', () => {
  let component: PrediosComponent;
  let fixture: ComponentFixture<PrediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrediosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
