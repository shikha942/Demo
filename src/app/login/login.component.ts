import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
     this.formSubmitAttempt = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

     this.loading = true;
     console.log(this.form.value);
     this.authService.login(this.form.value.email, this.form.value.password)
         .pipe(first())
         .subscribe(
            data => {
                this.alertService.success('Login successful', true);
                this.router.navigate(['/yoda/home']);
            },
            error => {
                this.alertService.error(error.error.message);
                this.loading = false;
                this.router.navigate(['/yoda/home']);
            });
      }
}
