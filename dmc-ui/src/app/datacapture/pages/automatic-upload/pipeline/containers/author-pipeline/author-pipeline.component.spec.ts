import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPipelineComponent } from './author-pipeline.component';

describe('AuthorPipelineComponent', () => {
  let component: AuthorPipelineComponent;
  let fixture: ComponentFixture<AuthorPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorPipelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
