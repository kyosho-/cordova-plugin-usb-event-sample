import { TestBed } from '@angular/core/testing';

import { UsbService } from './usb.service';

describe('UsbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsbService = TestBed.get(UsbService);
    expect(service).toBeTruthy();
  });
});
