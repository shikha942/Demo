import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public getLoggedInName = new BehaviorSubject<string>(" ");
  url = "http://ec2-13-126-128-40.ap-south-1.compute.amazonaws.com/sexpert/user";
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // login(user: User) {
  //   if (user.userName !== '' && user.password !== '' ) {
  //     this.http.post(this.url, user);
  //     this.loggedIn.next(true);
  //     this.getLoggedInName.next(user.userName);
  //     this.router.navigate(['/']);
  //   }
  //   else{
  //     this.loggedIn.next(false);
  //     this.getLoggedInName.next('Login');
  //   }
  // }

  login(email: string, password: string) {
          return this.http.post<any>(`${this.url}/login`, { email: email, password: password })
              .pipe(map(user => {
                  if (user && user.token) {
                        this.loggedIn.next(true);
                        this.getLoggedInName.next(email);
                  }

                  return user;
              }));
  }

  logout() {
    this.loggedIn.next(false);
    this.getLoggedInName.next('Login');
    this.router.navigate(['/login']);
  }
}
