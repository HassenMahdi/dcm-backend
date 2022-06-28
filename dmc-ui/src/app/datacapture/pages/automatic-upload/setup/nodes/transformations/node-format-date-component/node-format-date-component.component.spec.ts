import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeFormatDateComponent } from './node-format-date-component.component';

describe('NodeFormatDateComponent', () => {
  let component: NodeFormatDateComponent;
  let fixture: ComponentFixture<NodeFormatDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeFormatDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeFormatDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
