import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getLoggedInName = new BehaviorSubject<string>(" ");

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.getLoggedInName.next(user.userName);
      this.router.navigate(['/']);
    }
    else{
      this.loggedIn.next(false);
      this.getLoggedInName.next('Login');
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.getLoggedInName.next('Login');
    this.router.navigate(['/login']);
  }
}
