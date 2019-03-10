import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private music: MusicService, private router: Router) { }

  canActivate(): boolean{
  	console.log("Auth",this.auth.isLoggedIn());
  	if(!this.auth.isLoggedIn()){
  		this.router.navigateByUrl('/home');
  		return false;
  	}
  	return true;
  }
}
