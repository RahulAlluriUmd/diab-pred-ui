import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const authAPI = ''

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _client: HttpClient) { 
    
  }

  public isLoggedInSubject = new BehaviorSubject<any>(null);
  isLoggedIn$: Observable<any> = this.isLoggedInSubject.asObservable();

  

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

  removeItem(key: any) {
    localStorage.removeItem(key)
  }

  setItem(user: any){
    localStorage.setItem(user.email, JSON.stringify(user))
  }

  getItem(key: string){
    let item = localStorage.getItem(key)
    if (item != null) {
      return JSON.parse(item)
    }
    else{
      return ''
    }
    // return JSON.parse(localStorage.getItem(key) ?? '')
  }

  public isLoggedIn(): boolean {
    // this.user_subject.asObservable()
    const user = window.sessionStorage.getItem('USER_KEY');
    if (user) {
      return true;
    }

    return false;
  }

}
