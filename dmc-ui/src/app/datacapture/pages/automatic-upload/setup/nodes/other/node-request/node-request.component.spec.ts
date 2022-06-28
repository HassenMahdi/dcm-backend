import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeRequestComponent } from './node-request.component';

describe('NodeRequestComponent', () => {
  let component: NodeRequestComponent;
  let fixture: ComponentFixture<NodeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
