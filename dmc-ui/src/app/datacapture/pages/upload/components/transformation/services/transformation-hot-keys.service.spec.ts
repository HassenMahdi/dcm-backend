import { TestBed } from '@angular/core/testing';

import { TransformationHotKeysService } from './transformation-hot-keys.service';

describe('TransformationHotKeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformationHotKeysService = TestBed.get(TransformationHotKeysService);
    expect(service).toBeTruthy();
  });
});
