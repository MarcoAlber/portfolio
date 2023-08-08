import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  openMenu = false;

  /** toggles the responsive menu button and the scrollbar */
  toggleMenu() {
    if (!this.openMenu) {
      this.openMenu = true;
      document.body.style.overflowY = "hidden";
    }
    else {
      this.openMenu = false;
      document.body.style.overflowY = "auto";
    }
  }

  /** closes the menu after clicking on a section in the responsive menu */
  closeMenu() {
    this.openMenu ? this.toggleMenu() : false;
  }
}
