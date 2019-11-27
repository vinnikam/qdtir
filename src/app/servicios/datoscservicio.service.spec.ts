import { TestBed } from '@angular/core/testing';

import { DatoscservicioService } from './datoscservicio.service';

describe('DatoscservicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatoscservicioService = TestBed.get(DatoscservicioService);
    expect(service).toBeTruthy();
  });
});
