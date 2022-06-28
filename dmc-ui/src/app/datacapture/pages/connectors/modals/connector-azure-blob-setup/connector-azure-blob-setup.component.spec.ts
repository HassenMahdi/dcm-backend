import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorAzureBlobSetupComponent } from './connector-azure-blob-setup.component';

describe('ConnectorAzureBlobSetupComponent', () => {
  let component: ConnectorAzureBlobSetupComponent;
  let fixture: ComponentFixture<ConnectorAzureBlobSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorAzureBlobSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorAzureBlobSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
