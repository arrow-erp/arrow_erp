import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineClassRoomComponent } from './online-class-room.component';

describe('OnlieClassRoomComponent', () => {
  let component: OnlineClassRoomComponent;
  let fixture: ComponentFixture<OnlineClassRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineClassRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineClassRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
