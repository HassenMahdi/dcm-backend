import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareWithCollectionsComponent } from './share-with-collections.component';

describe('ShareWithCollectionsComponent', () => {
  let component: ShareWithCollectionsComponent;
  let fixture: ComponentFixture<ShareWithCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareWithCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareWithCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
