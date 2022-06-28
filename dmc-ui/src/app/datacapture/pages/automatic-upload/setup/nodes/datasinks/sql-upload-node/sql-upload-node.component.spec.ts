import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlUploadNodeComponent } from './sql-upload-node.component';

describe('SqlUploadNodeComponent', () => {
  let component: SqlUploadNodeComponent;
  let fixture: ComponentFixture<SqlUploadNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlUploadNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlUploadNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
