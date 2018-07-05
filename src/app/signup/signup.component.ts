import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EqualValidator } from '../shared/equal-validator.directive';

import { AuthService } from '../services/auth/auth.service';
import { AlertService } from '../services/alert/alert.service';
import { UserService } from '../services/user/user.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    loading = false;
    submitted = false;
    private formSubmitAttempt: boolean;
    checkbox1: string = "You are accessing an app designed for mature audience. If you are not 18 or above please exit the App. Click on the box if you are 18 or above to proceed";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private userService: UserService

    ) { }

    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            mobile: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]]
        });
    }


    isFieldInvalid(field: string) {
        return (
            (!this.signUpForm.get(field).valid && this.signUpForm.get(field).touched) ||
            (this.signUpForm.get(field).untouched && this.formSubmitAttempt)
        );
    }


    // convenience getter for easy access to form fields
    get f() { return this.signUpForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

         this.loading = true;
         console.log(this.signUpForm.value);
         this.userService.signUp(this.signUpForm.value)
             .pipe(first())
             .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                  //  this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}
