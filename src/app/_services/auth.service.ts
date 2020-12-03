import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const AUTH_API = 'http://localhost:8089/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      login: login,
      password: password
    }, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'v1/signup', {
      login: user.login,
      name: user.name,
      password: user.password
    }, httpOptions);
  }
}