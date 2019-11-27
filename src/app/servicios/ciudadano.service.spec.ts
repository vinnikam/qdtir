/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CiudadanoService } from './ciudadano.service';

describe('CiudadanoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiudadanoService]
    });
  });

  it('should ...', inject([CiudadanoService], (service: CiudadanoService) => {
    expect(service).toBeTruthy();
  }));
});
