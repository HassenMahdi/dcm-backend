import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeFormatCheckComponent } from './node-format-check.component';

describe('NodeFormatCheckComponent', () => {
  let component: NodeFormatCheckComponent;
  let fixture: ComponentFixture<NodeFormatCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeFormatCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeFormatCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
