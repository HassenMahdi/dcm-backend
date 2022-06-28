import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeKeySelectComponent } from './node-key-select.component';

describe('NodeKeySelectComponent', () => {
  let component: NodeKeySelectComponent;
  let fixture: ComponentFixture<NodeKeySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeKeySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeKeySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
