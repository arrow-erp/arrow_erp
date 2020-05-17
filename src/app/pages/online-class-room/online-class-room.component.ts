import {Component, OnInit} from '@angular/core';
import {CanvasWhiteboardComponent, CanvasWhiteboardUpdate} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'arrow-online-class-room',
  templateUrl: './online-class-room.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./online-class-room.component.scss']
})
export class OnlineClassRoomComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  sendBatchUpdate($event: CanvasWhiteboardUpdate[]) {

  }

  onCanvasClear() {

  }

  onCanvasUndo($event: any) {

  }

  onCanvasRedo($event: any) {

  }
}
