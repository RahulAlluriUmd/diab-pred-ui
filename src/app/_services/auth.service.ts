import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const authAPI = ''

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _client: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this._client.post(
      authAPI + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this._client.post(
      authAPI + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this._client.post(authAPI + 'signout', { }, httpOptions);
  }

  setItem(user: any){
    localStorage.setItem(user.email, JSON.stringify(user))
  }

  getItem(key: string){
    return JSON.parse(localStorage.getItem(key) ?? '')
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('USER_KEY');
    if (user) {
      return true;
    }

    return false;
  }

}
