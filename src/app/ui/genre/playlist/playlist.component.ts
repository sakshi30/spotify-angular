import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  music_playlist = [];
  token: any;

  ngOnInit() {
    this.token = this.auth.sendLoginCode().token;
  	this.music.displayMusic()
  			.subscribe(res => {console.log(res);
        res.playlists.items.forEach((value) => {
  				this.music_playlist.push(value);
  			})});
  	console.log(this.music_playlist);
  }

  displayTracks(music){
    console.log(music);
    this.music.getPlaylistTracks(music.tracks.href, this.token)
      .subscribe(res => {
      console.log(res);
      res.image = music.images[0].url;
      this.music.sendMusic(res)});
  }

}
