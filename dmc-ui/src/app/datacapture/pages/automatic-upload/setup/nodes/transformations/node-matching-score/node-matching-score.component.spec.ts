import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeMatchingScoreComponent } from './node-matching-score.component';

describe('NodeMatchingScoreComponent', () => {
  let component: NodeMatchingScoreComponent;
  let fixture: ComponentFixture<NodeMatchingScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeMatchingScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeMatchingScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
