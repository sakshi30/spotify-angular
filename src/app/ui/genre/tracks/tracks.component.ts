import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  music_playlist = [];
  image_url= [];
  token: any;

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.displayMusic()
  			.subscribe(res => { console.log(res);
          if(res.items){
    				res.items.forEach((value) => {
    					this.music_playlist.push(value);
    				});
    				this.image_url.push(res.image);
          }
          else{
            console.log(res);
          }
  			});
  	console.log(this.music_playlist, this.image_url);
  }

  Play_song(song){
  	var items = song.split("/");
  	console.log(items[5]);

  	this.music.PlayTrack(items[5], this.token)
  		.subscribe(res => {
      var song_link = res.external_urls.spotify;
      window.open(song_link, '_blank');
      this.music.sendTrack(res)});
  }

}
