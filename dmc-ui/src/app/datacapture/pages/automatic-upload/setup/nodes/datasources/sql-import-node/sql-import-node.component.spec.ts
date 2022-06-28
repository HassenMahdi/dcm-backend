import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlImportNodeComponent } from './sql-import-node.component';

describe('SqlImportNodeComponent', () => {
  let component: SqlImportNodeComponent;
  let fixture: ComponentFixture<SqlImportNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlImportNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlImportNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
