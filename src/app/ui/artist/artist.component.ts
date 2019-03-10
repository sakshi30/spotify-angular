import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../service/music.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(private music: MusicService) { }

  ngOnInit() {

  }

}
