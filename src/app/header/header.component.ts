import { Component, Output, EventEmitter } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

@Output() sideNavToggled = new EventEmitter<boolean>();
menuStatus: boolean = false;

constructor() {}
ngOnInit(): void {

}
SideNavToggle(){
  this.menuStatus = !this.menuStatus
  this.sideNavToggled.emit(this.menuStatus);

}
}
