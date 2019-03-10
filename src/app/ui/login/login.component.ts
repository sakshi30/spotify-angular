import { Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	var scopes = 'user-read-private user-read-email user-read-playback-state user-library-modify user-library-read streaming user-read-birthdate user-modify-playback-state';
  	var my_client_id = '9ad22327258640c7856cbc68a1a69aae';
  	var redirect_uri = 'http://localhost:4200/';
  	window.location.href='https://accounts.spotify.com/authorize' +'?response_type=token' +'&client_id=' + my_client_id +(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +'&redirect_uri=' + encodeURIComponent(redirect_uri);
  	if(this.route.snapshot.queryParams['access_token']){
  		this.auth.logIn(this.route.snapshot.queryParams['access_token']);
  	}
  }

}
