import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-artist-playlist',
  templateUrl: './artist-playlist.component.html',
  styleUrls: ['./artist-playlist.component.css']
})
export class ArtistPlaylistComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  music_playlist = [];
  image_url= [];
  token: any;

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.displayMusic()
  			.subscribe(res => { console.log(res);
        if(res.tracks){
				res.tracks.forEach((value) => {
					this.music_playlist.push(value);
				});
        }
				this.image_url.push(res.image);
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
