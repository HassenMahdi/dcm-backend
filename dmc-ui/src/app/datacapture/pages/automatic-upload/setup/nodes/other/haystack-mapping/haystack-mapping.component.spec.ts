import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaystackMappingComponent } from './haystack-mapping.component';

describe('HaystackMappingComponent', () => {
  let component: HaystackMappingComponent;
  let fixture: ComponentFixture<HaystackMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaystackMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaystackMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
