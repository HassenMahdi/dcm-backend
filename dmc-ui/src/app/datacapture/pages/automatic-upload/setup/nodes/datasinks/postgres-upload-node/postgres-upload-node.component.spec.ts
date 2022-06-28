import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgresUploadNodeComponent } from './postgres-upload-node.component';

describe('PostgresUploadNodeComponent', () => {
  let component: PostgresUploadNodeComponent;
  let fixture: ComponentFixture<PostgresUploadNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostgresUploadNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgresUploadNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
