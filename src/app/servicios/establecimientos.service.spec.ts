import { TestBed } from '@angular/core/testing';

import { EstablecimientosService } from './establecimientos.service';

describe('EstablecimientosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstablecimientosService = TestBed.get(EstablecimientosService);
    expect(service).toBeTruthy();
  });
});
