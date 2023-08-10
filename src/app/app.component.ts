import { Component, OnInit } from '@angular/core';
import * as AOS from "aos";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  /** loads the AOS library on init */
  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }
}
