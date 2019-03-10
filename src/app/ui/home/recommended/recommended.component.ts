import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../../service/music.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

	token: string;
	recom_playlists = [];
  top_albums = [];
  liked_albums = [];
  flag: Boolean = false;

  constructor(private music: MusicService, private auth: AuthService) { }

  ngOnInit() {
    this.flag = this.auth.isLoggedIn();
    console.log(this.flag);
  	this.token = this.auth.sendLoginCode().token;
  	this.music.recommendmusic(this.token)
  				.subscribe(res => {
  					res.playlists.items.forEach((value) => {
  						this.recom_playlists.push(value);
  					})
  				});
  	this.music.getTopAlbums(this.token)
        .subscribe(res => {
            res.albums.forEach((value) => {
              this.top_albums.push(value);
            })
        });
    this.music.getLikedSong(this.token)
        .subscribe(res => {
        res.items.forEach((value) => {
          this.liked_albums.push(value.album);
        })
      });
    console.log(this.liked_albums);
  }

  getPlaylist(href, image){
  	this.music.getPlaylistTracks(href, this.token)
  			.subscribe(res => {
        res.image = image;
        this.music.sendMusic(res);
        });

  }

  getPlaylistOfAlbum(id, image){
    this.music.getPlaylistofAlbum(id, this.token)
        .subscribe(res => {
        res.image = image;
        this.music.sendMusic(res);
        });
  }


}
