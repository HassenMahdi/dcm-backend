import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbImportNodeComponent } from './mongodb-import-node.component';

describe('MongodbImportNodeComponent', () => {
  let component: MongodbImportNodeComponent;
  let fixture: ComponentFixture<MongodbImportNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongodbImportNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MongodbImportNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
