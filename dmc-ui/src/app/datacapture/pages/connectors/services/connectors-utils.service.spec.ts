import { TestBed } from '@angular/core/testing';

import { ConnectorsUtilsService } from './connectors-utils.service';

describe('ConnectorsUtilsService', () => {
  let service: ConnectorsUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectorsUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
