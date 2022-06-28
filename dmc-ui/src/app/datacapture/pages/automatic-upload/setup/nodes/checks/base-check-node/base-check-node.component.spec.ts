import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCheckNodeComponent } from './base-check-node.component';

describe('BaseCheckNodeComponent', () => {
  let component: BaseCheckNodeComponent;
  let fixture: ComponentFixture<BaseCheckNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCheckNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCheckNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
