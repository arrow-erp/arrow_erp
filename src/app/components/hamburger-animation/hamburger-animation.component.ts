import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arrow-hamburger-animation',
  templateUrl: './hamburger-animation.component.html',
  styleUrls: ['./hamburger-animation.component.scss']
})
export class HamburgerAnimationComponent implements OnInit {
  toggle = false;
  constructor() { }

  ngOnInit(): void {
  }

}
