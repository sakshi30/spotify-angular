import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../service/music.service';
import {AuthService} from '../../service/auth.service';
import {MatSnackBar} from '@angular/material';
import { PlaylistComponent } from '../../ui/genre/playlist/playlist.component';

@Component({
  selector: 'app-latest-music',
  templateUrl: './latest-music.component.html',
  styleUrls: ['./latest-music.component.css']
})
export class LatestMusicComponent implements OnInit {

  constructor(private music: MusicService, private auth: AuthService, private snackBar: MatSnackBar) { }

  token: string;
  latest_music = [];
  liked_songs = [];
  favourite_songs = [];
  list_of_ids = [];

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.getLatestMusic(this.token)
  			.subscribe(res=> {res.albums.items.forEach((value) => { value.defined = {"flag": true, "play": true, "favourite":true}
        this.latest_music.push(value);
        this.list_of_ids.push(value.id);
        })});
  	console.log(this.latest_music);

  }

  like(x, index){
    x.latest_music[index].defined.flag= !x.latest_music[index].defined.flag;
    if(!x.latest_music[index].defined.flag){
      this.snackBar.open("I like it!", "Dismiss", {
        duration: 2000,
      });
      this.liked_songs.push(x.latest_music[index]);
      this.music.saveLikedSong(x.latest_music[index].id, this.token);
    }
    else{
      this.snackBar.open("I don't like it anymore!", "Dismiss", {
        duration: 2000,
      });
      this.liked_songs = this.liked_songs.filter(obj => obj != x.latest_music[index]);
    }
    this.music.saveUnlikedSong(x.latest_music[index].id, this.token);
  }


  markAsFav(x,index){
    x.latest_music[index].defined.favourite= !x.latest_music[index].defined.favourite;
    if(!x.latest_music[index].defined.favourite){
      this.snackBar.open("Marked as Favourite", "Dismiss", {
        duration: 2000,
      });
      this.favourite_songs.push(x.latest_music[index]);
    }
    else{
      this.snackBar.open("Not my Favourite", "Dismiss", {
        duration: 2000,
      });
      this.favourite_songs = this.favourite_songs.filter(obj => obj != x.latest_music[index]);
    }
    this.music.displayFavSongs(this.favourite_songs);
  }

  playSong(x, index){
    var url = x.latest_music[index].external_urls.spotify;
    window.open(url, '_blank');
    this.music.passDataToPlayer(x.latest_music[index].name, x.latest_music[index].images[2].url, x.latest_music[index].artists);
  }
}
