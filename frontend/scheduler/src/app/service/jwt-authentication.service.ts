import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

export const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor( private http: HttpClient) { }

  executeJWTAuthenticationService(username, password) {

    let url = `${API_URL}/authenticate`;

    return this.http.post<any>(url, {
       "username":username,
        "password":password
      }).pipe(
      map(
        data=> {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticateToken(){
    if( this.getAuthenticatedUser() )
      return sessionStorage.getItem(TOKEN);
  }
  
  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user ===null);
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');
  }

}
