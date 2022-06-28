import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsHierarchyComponent } from './domains-hierarchy.component';

describe('DomainsHierarchyComponent', () => {
  let component: DomainsHierarchyComponent;
  let fixture: ComponentFixture<DomainsHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainsHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainsHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
