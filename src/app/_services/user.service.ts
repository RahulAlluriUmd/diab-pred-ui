import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUri = '';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _client: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this._client.get(apiUri + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this._client.get(apiUri + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this._client.get(apiUri + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this._client.get(apiUri + 'admin', { responseType: 'text' });
  }

  saveUser(data: any){
    console.log(data)
  }

  getUser(){
    return {
      roles: ['test1', 'test2'],
      user:{
        username: ''
      }
    }
  }
}
