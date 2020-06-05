import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Function to authenticate user
   * @param username 
   * @param password 
   */
  login(username: string, password: string){
    return this.http.post(environment.LOGIN_URL + '/authenticate', {username, password}).toPromise();
  }
}
