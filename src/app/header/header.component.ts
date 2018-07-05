import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginSignUpDialogComponent } from '../dialog/logInSignUp.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(private authenticationService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authenticationService.getLoggedInName.subscribe(name => this.userName = name);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    dialogConfig.width = '500px';
    dialogConfig.height = '400px';
    const dialogRef = this.dialog.open(LoginSignUpDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  toggle = true;
  collapseSideBar() {
    this.toggle = !this.toggle;
  }
}
