import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../../ui/login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {MusicService} from '../../service/music.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: any;
  username: any;
  constructor(public dialog: MatDialog, private auth: AuthService,private music: MusicService, private router: Router, private http: HttpClient, private el: ElementRef, private renderer: Renderer, private location: Location) { }

  ngOnInit() {
    if(this.auth.sendLoginCode().token === null){
      var link = location.href.split("=");
      console.log(link);
        this.token = link[1].split("&")[0];
    }
    else if(this.auth.sendLoginCode() !== null){
      this.token = this.auth.sendLoginCode().token;
    }
    this.auth.getUserCred(this.token)
      .subscribe(res => {console.log(res);
      if(res.display_name){
          this.username = res.display_name;
      }});

  }
  onMenuClick(){
    //this.el.nativeElement.querySelector('.navbar-ex1-collapse')  get the DOM
        //this.renderer.setElementClass('DOM-Element', 'css-class-you-want-to-add', false) if 3rd value is true 
        //it will add the css class. 'show' class is responsible for showing the menu.
        this.renderer.setElementClass(this.el.nativeElement.querySelector('#navbarsExample05'), 'show', false);        
  }
  openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '600px', height: '150px'});
    }

  logoutForm(){
    this.auth.logout();
  }
  lookForQuery(search){
    this.music.getResultForSearch(search.value, this.token)
      .subscribe(res => {
      this.music.sendMusic(res)
      });
  }
}
