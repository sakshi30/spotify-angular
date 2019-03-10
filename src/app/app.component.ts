import { Component, OnInit } from '@angular/core';
import {MusicService} from './service/music.service';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  flag: Boolean;
  token: string;
  constructor(private auth: AuthService){}

  ngOnInit(){
  	this.flag = this.auth.isLoggedIn();
  	this.token = this.auth.sendLoginCode().token;
    if(this.token){
      this.flag = true;
    }
  }
}
