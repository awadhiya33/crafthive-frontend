/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductResolveService } from './ProductResolve.service';

describe('Service: ProductResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductResolveService]
    });
  });

  it('should ...', inject([ProductResolveService], (service: ProductResolveService) => {
    expect(service).toBeTruthy();
  }));
});
