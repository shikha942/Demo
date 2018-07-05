import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import API_URL from '../../config.js';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = "http://ec2-13-126-128-40.ap-south-1.compute.amazonaws.com/sexpert/question";
  userId = "c8981d10-9a24-4d96-86cb-0cdd0ed848f6"

  constructor(private http: HttpClient) { }

  askQuestion(data) {
    console.log(data);
    return this.http.post(`${this.url}/${this.userId}/${data.question}`, data);
  }
}
