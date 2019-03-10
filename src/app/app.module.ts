import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './ui/home/home.component';
import { LatestMusicComponent } from './ui/latest-music/latest-music.component';
import { MyFavComponent } from './ui/my-fav/my-fav.component';
import { ArtistComponent } from './ui/artist/artist.component';
import { GenreComponent } from './ui/genre/genre.component';
import { LoginComponent } from './ui/login/login.component';
import { AuthService } from './service/auth.service';
import { MusicService } from './service/music.service';
import {baseURL} from './service/baseUrl';

import {MatToolbarModule,MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatSnackBarModule, MatProgressBarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './ui/genre/category-list/category-list.component';
import { PlaylistComponent } from './ui/genre/playlist/playlist.component';
import { PlayerComponent } from './ui/player/player.component';
import { RecommendedComponent } from './ui/home/recommended/recommended.component';
import { PlaylistsComponent } from './ui/home/playlists/playlists.component';
import { AllFavComponent } from './ui/my-fav/all-fav/all-fav.component';
import { FavPlayerComponent } from './ui/my-fav/fav-player/fav-player.component';
import { TopArtistComponent } from './ui/artist/top-artist/top-artist.component';
import { ArtistPlaylistComponent } from './ui/artist/artist-playlist/artist-playlist.component';
import { TracksComponent } from './ui/genre/tracks/tracks.component';
import { SearchComponent } from './common/search/search.component';
import { AuthGuardService } from './service/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LatestMusicComponent,
    MyFavComponent,
    ArtistComponent,
    GenreComponent,
    LoginComponent,
    CategoryListComponent,
    PlaylistComponent,
    PlayerComponent,
    RecommendedComponent,
    PlaylistsComponent,
    AllFavComponent,
    FavPlayerComponent,
    TopArtistComponent,
    ArtistPlaylistComponent,
    TracksComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, 
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [AuthService, {provide: 'baseURL', useValue: baseURL}, MusicService, AuthGuardService],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
