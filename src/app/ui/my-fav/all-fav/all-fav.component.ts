import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-all-fav',
  templateUrl: './all-fav.component.html',
  styleUrls: ['./all-fav.component.css']
})
export class AllFavComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService) { }

  token: string;
  liked_albums = [];
  liked_tracks = [];

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.getLikedSongFav(this.token)
        .subscribe(res => {
        res.items.forEach((value) => {
          this.liked_albums.push(value.album);
        })
    });
    this.music.getLikedSongFavTrack(this.token)
    	.subscribe(res => {
    		res.items.forEach((value) => {
	          this.liked_tracks.push(value.track);
	        })
    	});
    console.log(this.liked_tracks)
  }

  getPlaylistOfAlbum(id, image){
    this.music.getPlaylistofAlbum(id, this.token)
        .subscribe(res => {
        res.image = image;
        this.music.sendMusic(res);
        });
  }
  Play_song(song){
  	var items = song.split("/");
  	console.log(items[5]);
  	this.music.PlayTrack(items[5], this.token)
  		.subscribe(res => {this.music.sendTrack(res)});
  }
}
