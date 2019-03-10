import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {MusicService} from '../../service/music.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private auth: AuthService,private music: MusicService) { }

  token: any;
  related_artist =[];
  related_tracks = [];
  flag: Boolean;

  ngOnInit() {
    this.flag = false;
  	this.token = this.auth.sendLoginCode().token;
  	this.music.displayMusic()
  			.subscribe(res => {console.log(res);
          this.flag = true;
          this.related_artist =[];
          this.related_tracks = [];
          if(res.artists){
    				res.artists.items.forEach((value) => {
              if(value.images[0]){
                this.related_artist.push(value);
              }
    					
  				});
          }
          if(res.tracks.items){
  				res.tracks.items.forEach((value) => {
  					this.related_tracks.push(value);
  				});
          }
  			});
  	console.log(this.related_artist, this.related_tracks);

  }

  getListOfTracks(id, image){
  	this.music.getArtistTracks(id, this.token)
  		.subscribe(res => {
        	res.image = image;
        	this.music.sendMusic(res);
        })
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
