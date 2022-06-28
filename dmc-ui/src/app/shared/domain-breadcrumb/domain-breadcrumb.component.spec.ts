import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainBreadcrumbComponent } from './domain-breadcrumb.component';

describe('DomainBreadcrumbComponent', () => {
  let component: DomainBreadcrumbComponent;
  let fixture: ComponentFixture<DomainBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
