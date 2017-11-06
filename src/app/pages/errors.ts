import { Component, OnInit, Input } from '@angular/core';

@Component({
  templateUrl: 'errors.html'
})
export class Errors implements OnInit {
  title = localStorage.getItem("title");
  constructor() { }
  
  ngOnInit() {
	localStorage.getItem("title");
  }
}
