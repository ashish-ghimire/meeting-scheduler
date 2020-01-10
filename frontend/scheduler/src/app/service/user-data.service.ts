import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class User{
  constructor(public id: number, public username: string, public password: string) { }
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  API_URL = 'http://localhost:8080';

  constructor( private http: HttpClient ) { }

  createNewUser( username: string, password: string){
    let user = new User(-1, username, password);
    let url = `${this.API_URL}/users`;
    return this.http.post<User>(url, user);
  }

  getAllUsers(){
    let url = `${this.API_URL}/users`;
    return this.http.get<User[]>(url);
  }
}
