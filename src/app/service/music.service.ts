import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  fav_songs = new Subject<any>();
  category_player = new Subject<any>();
  artist = new Subject<any>();
  details_of_song = new Subject<any>();
  tracks = new Subject<any>();

  //get latest music from Spotify
  getLatestMusic(token: any): Observable<any>{
  	const headers = new HttpHeaders({
  		'Accept': 'application/json',
  		'Content-Type': 'application/json',
  		'Authorization': 'Bearer '+token
  	});
  	return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases?country=IN", {headers: headers});
  }

  //search for a value
  getResultForSearch(query, token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/search?q="+query+"&type=track%2Cartist&limit=10", {headers: headers});
  }

  //get Albums
  getTopAlbums(token: any): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/albums?ids=2noRn2Aes5aoNVsU6iWThc%2C2X8UOIkZQdcz2Hi5Ynt2uk%2C0gOMkjTX1TjsCspiadQDTo%2C3I9Z1nDCL4E0cP62flcbI5%2C0ETFjACtuP2ADo6LFhL6HN", {headers: headers});
  }

  //get Categories from SPotify
  getGenre(token: any): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/browse/categories", {headers: headers});
  }

  getPlaylist(href: any, token: any): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>(href+'/playlists', {headers: headers});
  }

  //get tracks of a playlist
  getPlaylistTracks(href: any, token: any): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>(href+'?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=20&offset=5', {headers: headers});
  }

  //send tracks to next page
  sendMusic(tracks){
    this.category_player.next(tracks);
  }

  //display tracks on next page
  displayMusic(): any{
    return this.category_player.asObservable();
  }
  sendTrack(tracks){
    console.log(tracks);
    this.tracks.next(tracks);
  }

  displayTrack(): any{
    return this.tracks.asObservable();
  }
  //get list of all the tracks of an album
   getPlaylistofAlbum(id, token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    }); 
   return this.http.get<any>("https://api.spotify.com/v1/albums/"+id+"/tracks", {headers: headers});

  }

  //save the song liked by user
  saveLikedSong(id, token){
      const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.put("https://api.spotify.com/v1/me/albums?ids="+id, {headers: headers});
  }

  //delete a song
  saveUnlikedSong(id, token){
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.delete("https://api.spotify.com/v1/me/albums?ids="+id, {headers: headers});
  }

//get liked songs by user for fav page
  getLikedSongFav(token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/me/albums", {headers: headers});
  }
  getLikedSongFavTrack(token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/me/tracks", {headers: headers});
  }

  //get liked songs by user for home page
  getLikedSong(token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/me/albums?limit=5", {headers: headers});
  }

  
  displayFavSongs(songs){
    this.fav_songs.next(songs);
  }
  sendFavSongs(): any{
    console.log(this.fav_songs);
    return this.fav_songs.asObservable();
  }

  passDataToPlayer(name, image, artist){
    this.details_of_song.next([name, image, artist]);
    console.log(name, image, artist);
  }

  displayDataToPlayer(): any{
    return this.details_of_song.asObservable();
  }

  //get information of current track
  getPlayerInfo(token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/me/player?market=US", {headers: headers});
  }

  //featured tracks from Spotify
  recommendmusic(token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/browse/featured-playlists?country=IN&locale=en-IN&timestamp=2019-03-05T09%3A00%3A00&limit=5&offset=1", {headers: headers});
  }

  PlayTrack(id, token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/tracks/"+id+'?market=ES', {headers: headers});
  }

  //get all artists
  getAllArtist(token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>('https://api.spotify.com/v1/artists?ids=6S2OmqARrzebs0tKUEyXyp%2C0hCNtLu0JehylgoiP8L4Gh%2C04gDigrS5kc9YWfZHwBETP%2C66CXWjxzNUsdJxJ2JdwvnR%2C6tbjWDEIzxoDsBA1FuhfPW%2C7CajNmpbOovFoOoasH2HaY%2C1uNFoZAHBGtllmzznpCI3s%2C64M6ah0SkkRsnPGtGiRAbb%2C6LuN9FCkKOj5PcnpouEgny%2C66CXWjxzNUsdJxJ2JdwvnR%2C7gOdHgIoIKoe4i9Tta6qdD%2C7uIbLdzzSEqnX0Pkrb56cR%2C7HCqGPJcQTyGJ2yqntbuyr%2C3OLGltG8UPIea8sA4w0yg0%2C1SJOL9HJ08YOn92lFcYf8a%2C4YRxDV8wJFPHPTeXepOstw%2C0oOet2f43PA68X5RxKobEy%2C3eDT9fwXKuHWFvgZaaYC5v%2C2FPwX3Gh0w4Qr1v3zSTtcT%2C6Mv8GjQa7LKUGCAqa9qqdb%2C5rQoBDKFnd1n6BkdbgVaRL%2C5f4QpKfy7ptCHwTqspnSJI%2C0L5GV6LN8SWWUWIdBbTLTZ%2C1dVygo6tRFXC8CSWURQJq2', {headers: headers});
  }
  //get tracks for an artist
  getArtistTracks(id, token): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
    return this.http.get<any>("https://api.spotify.com/v1/artists/"+id+"/top-tracks?country=ES", {headers:headers});
  }
}
