import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesAllocationComponent } from './batches-allocation.component';

describe('BatchesAllocationComponent', () => {
  let component: BatchesAllocationComponent;
  let fixture: ComponentFixture<BatchesAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchesAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
