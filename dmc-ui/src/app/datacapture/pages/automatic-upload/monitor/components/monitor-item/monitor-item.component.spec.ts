import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorItemComponent } from './monitor-item.component';

describe('MonitorItemComponent', () => {
  let component: MonitorItemComponent;
  let fixture: ComponentFixture<MonitorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
