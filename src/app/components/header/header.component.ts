import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'arrow-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() menuData: { label: string, id: string, route?: string }[] = [];


  constructor() {
  }

  ngOnInit(): void {
  }

}
