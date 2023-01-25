import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated=true;
  private _userId='abc';

  get userAuthenticate(){
    return this._isAuthenticated;
  }



  login(){
    this._isAuthenticated=true;
  }

  logout(){
    this._isAuthenticated=false
  }

  get userId(){
    return this._userId;
  }

  constructor() { }
}
