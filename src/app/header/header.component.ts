import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;

   constructor(private authenticationService: AuthService) {}

  ngOnInit() {
     this.authenticationService.getLoggedInName.subscribe(name => this.userName = name);
  }

  toggle = true;
  collapseSideBar() {
    this.toggle = !this.toggle;
  }
}
