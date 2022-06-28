import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgresImportNodeComponent } from './postgres-import-node.component';

describe('PostgresImportNodeComponent', () => {
  let component: PostgresImportNodeComponent;
  let fixture: ComponentFixture<PostgresImportNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostgresImportNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgresImportNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
