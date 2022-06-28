import { TestBed } from '@angular/core/testing';

import { HotKeysService } from './hot-keys.service';

describe('HotKeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotKeysService = TestBed.get(HotKeysService);
    expect(service).toBeTruthy();
  });
});
