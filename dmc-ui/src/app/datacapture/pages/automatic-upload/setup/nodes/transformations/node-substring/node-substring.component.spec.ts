import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSubstringComponent } from './node-substring.component';

describe('NodeSubstringComponent', () => {
  let component: NodeSubstringComponent;
  let fixture: ComponentFixture<NodeSubstringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeSubstringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSubstringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
