import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCellRendererComponent } from './tags-cell-renderer.component';

describe('TagsCellRendererComponent', () => {
  let component: TagsCellRendererComponent;
  let fixture: ComponentFixture<TagsCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
