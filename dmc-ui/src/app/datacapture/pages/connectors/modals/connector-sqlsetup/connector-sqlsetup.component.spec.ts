import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorSQLSetupComponent } from './connector-sqlsetup.component';

describe('ConnectorSQLSetupComponent', () => {
  let component: ConnectorSQLSetupComponent;
  let fixture: ComponentFixture<ConnectorSQLSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorSQLSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorSQLSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
