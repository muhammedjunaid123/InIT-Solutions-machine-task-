import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../interface/user_interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(data: user) {
   return this.http.post('http://localhost:3000/login',data)
  }
}

