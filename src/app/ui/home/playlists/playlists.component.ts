import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  music_playlist = [];
  image_url= [];
  token: any;
  song_link:string;

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
  	this.music.PlayTrack(items[5], this.token)
  		.subscribe(res => {console.log(res);
      this.song_link = res.external_urls.spotify;
      window.open(this.song_link, '_blank');
      this.music.sendTrack(res)});
  }

}
