import { TestBed } from '@angular/core/testing';

import { AzureConnectorService } from './azure-connector.service';

describe('AzureConnectorService', () => {
  let service: AzureConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
