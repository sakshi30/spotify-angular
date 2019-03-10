import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import {MusicService} from '../../service/music.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

	songName: string;
	artist: string;
	img: string;
	token: string;
	song: string;
	audio: any = new Audio();
	paused = false;
  uri: string;
	@Output() pauseplay = new EventEmitter();


  constructor(private music: MusicService, private auth: AuthService, private el: ElementRef) { }

  ngOnInit() {
  	this.token = this.auth.sendLoginCode().token;
  	this.music.getPlayerInfo(this.token)
  			.subscribe(res => {
                if(res){
  								this.songName = res.item.name;
  								this.artist = res.item.artists[0].name;
  								this.img = res.item.album.images[2].url;
  								this.song = res.item.preview_url;
                  this.uri = res.item.external_urls.spotify;
                }
  			});
    this.music.displayTrack()
        .subscribe(res => {console.log(res)
                  if(res){ console.log(res);
                    this.songName = res.name;
                    this.artist = res.artists[0].name;
                    this.img = res.album.images[2].url;
                    this.song = res.preview_url;
                    this.uri = res.external_urls.spotify;
                  }
        })
  }

  playSong(){
  	console.log("Song plays");
  	this.paused = !this.paused;
  	this.audio.src = this.song;
  	this.audio.load();
  	this.audio.play();
  }

  pauseSong(){
  	this.paused = !this.paused;
  	this.audio.pause();
  }

  playLastSong(){

  }
  stopThePlayer(){

  }
  shuffleThePlayer(){

  }
  playNextSong(){

  }
}
