import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainHierarchyComponent } from './domain-hierarchy.component';

describe('DomainHierarchyComponent', () => {
  let component: DomainHierarchyComponent;
  let fixture: ComponentFixture<DomainHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
