import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from './baseUrl';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

	authCode: string;
  authenticated: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  getUserCred(token: any): Observable<any>{
  	var headers: HttpHeaders = new HttpHeaders({
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + token
	});
  this.authenticated = true;
	localStorage.setItem('code', token);
  	return this.http.get<any>("https://api.spotify.com/v1/me", {headers: headers})
  }
  logIn(data: string){
    this.authenticated = true;
  	localStorage.setItem('code', data);
  	console.log(localStorage);
  }
  isLoggedIn(): boolean{
    return this.authenticated;
  }
  sendLoginCode(): any{
  	var code = localStorage.getItem('code');
  	return {"token": code};
  }
  logout(){
  	localStorage.removeItem('code');
    this.authenticated = false;
  	window.location.href='http://localhost:4200/';
  }
}
