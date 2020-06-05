import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getLoggedIn() {
    return sessionStorage.getItem("loggedIn");
  }

  isLoggedIn(){
    if(this.getLoggedIn())
      return true
    else
      return false
  }
}
