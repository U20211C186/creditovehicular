import { TestBed } from '@angular/core/testing';

import { VehicleCreditService } from './vehicle.credit.service';

describe('VehicleCreditService', () => {
  let service: VehicleCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
