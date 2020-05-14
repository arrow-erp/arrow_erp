import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'arrow-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  @Input() menuData: any[];

}
