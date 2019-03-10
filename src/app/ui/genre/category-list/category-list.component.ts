import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  categories= [];
  token: any;

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.getGenre(this.token)
  			.subscribe(res=> {res.categories.items.forEach((value) => {
  				this.categories.push(value);
  			})});
  	console.log(this.categories);
  }

  getPlaylist(href){
  	this.music.getPlaylist(href, this.token)
  			.subscribe(res => {this.music.sendMusic(res)});
  }

}
