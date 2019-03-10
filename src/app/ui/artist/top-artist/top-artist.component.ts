import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.css']
})
export class TopArtistComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  token: string;
  all_artist = [];

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.getAllArtist(this.token)
        .subscribe(res => {
        	res.artists.forEach((value) => {
        		this.all_artist.push(value);
        	});
    });
    console.log(this.all_artist);
  }

  getListOfTracks(id, image){
  	this.music.getArtistTracks(id, this.token)
  		.subscribe(res => {
        	res.image = image;
        	this.music.sendMusic(res);
        })
  }

}
