import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodePluginComponent } from './node-plugin.component';

describe('NodePluginComponent', () => {
  let component: NodePluginComponent;
  let fixture: ComponentFixture<NodePluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodePluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
