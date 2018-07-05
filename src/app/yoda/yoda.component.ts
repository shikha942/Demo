import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { AlertService } from '../services/alert/alert.service';
import { QuestionService } from '../services/question/question.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginSignUpDialogComponent } from '../dialog/logInSignUp.component';

@Component({
  selector: 'app-yoda',
  templateUrl: './yoda.component.html',
  styleUrls: ['./yoda.component.css']
})
export class YodaComponent implements OnInit {
  yodaform: FormGroup;
  loading = false;
  submitted = false;
  private formSubmitAttempt: boolean;
  isLoggedIn$: Observable<boolean>;

  constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private dialog: MatDialog,
   private authenticationService: AuthService,
   private alertService: AlertService,
   private questionService: QuestionService,
) { }

  ngOnInit() {
    //this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    this.yodaform = this.formBuilder.group({
        question: ['', Validators.required]
    });
  }
  get f() { return this.yodaform.controls; }

  onSubmit(){
    this.submitted = true;
    this.authenticationService.isLoggedIn
    .pipe(first())
    .subscribe((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.alertService.error("user is not loggedIn");
          this.openDialog();
          return false;
        }
        else{
          this.questionService.askQuestion(this.yodaform.value)
          .pipe(first())
          .subscribe(
             data => {
                 this.alertService.success('Save Question', true);
               //  this.router.navigate(['/login']);
             },
             error => {
                 this.alertService.error(error.error.message);
                 this.loading = false;
             });
        }
        return true;
      });
  }

  openDialog(){
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
}
