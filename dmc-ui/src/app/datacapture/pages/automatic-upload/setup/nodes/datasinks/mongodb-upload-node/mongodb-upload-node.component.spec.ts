import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbUploadNodeComponent } from './mongodb-upload-node.component';

describe('MongodbUploadNodeComponent', () => {
  let component: MongodbUploadNodeComponent;
  let fixture: ComponentFixture<MongodbUploadNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongodbUploadNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MongodbUploadNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
