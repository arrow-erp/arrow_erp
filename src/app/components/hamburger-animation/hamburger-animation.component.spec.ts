import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerAnimationComponent } from './hamburger-animation.component';

describe('HamburgerAnimationComponent', () => {
  let component: HamburgerAnimationComponent;
  let fixture: ComponentFixture<HamburgerAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamburgerAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
