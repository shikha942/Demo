import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import API_URL from '../../config.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://ec2-13-126-128-40.ap-south-1.compute.amazonaws.com/sexpert/user";

  constructor(private http: HttpClient) { }

  signUp(data) {
    console.log(data);
    return this.http.post(this.url, data);
  }
}
