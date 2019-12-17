import { TestBed } from '@angular/core/testing';

import { NavbarserviceService } from './navbarservice.service';

describe('NavbarserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarserviceService = TestBed.get(NavbarserviceService);
    expect(service).toBeTruthy();
  });
});
