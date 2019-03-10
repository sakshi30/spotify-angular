import { Routes } from '@angular/router';
import { LatestMusicComponent } from './ui/latest-music/latest-music.component';
import { TopArtistComponent } from './ui/artist/top-artist/top-artist.component';
import { ArtistPlaylistComponent } from './ui/artist/artist-playlist/artist-playlist.component';
import { LoginComponent } from './ui/login/login.component';
import { CategoryListComponent } from './ui/genre/category-list/category-list.component';
import { PlaylistComponent } from './ui/genre/playlist/playlist.component';
import { PlaylistsComponent } from './ui/home/playlists/playlists.component';
import { RecommendedComponent } from './ui/home/recommended/recommended.component';
import { AllFavComponent } from './ui/my-fav/all-fav/all-fav.component';
import { FavPlayerComponent } from './ui/my-fav/fav-player/fav-player.component';
import { TracksComponent } from './ui/genre/tracks/tracks.component';
import { SearchComponent } from './common/search/search.component';
import { AuthGuardService as AuthGuard} from './service/auth-guard.service';

export const routes: Routes = [
	{path: '\home', component: RecommendedComponent},
	{path: '\search', component: SearchComponent, canActivate: [AuthGuard]},
	{path: '\home/player', component: PlaylistsComponent, canActivate: [AuthGuard]},
	{path: '\latestmusic', component: LatestMusicComponent, canActivate: [AuthGuard]},
	{path: '\myfavmusic', component: AllFavComponent, canActivate: [AuthGuard]},
	{path: '\myfavmusic/player', component: FavPlayerComponent, canActivate: [AuthGuard]},
	{path: '\artist', component: TopArtistComponent, canActivate: [AuthGuard]},
	{path: '\artist/player', component: ArtistPlaylistComponent, canActivate: [AuthGuard]},
	{path: '\genre', component: CategoryListComponent, canActivate: [AuthGuard]},
	{path: '\genre/playlist', component: PlaylistComponent, canActivate: [AuthGuard]},
	{path: '\genre/playlist/tracks', component: TracksComponent, canActivate: [AuthGuard]},
	{path: '', redirectTo: '\home', pathMatch: 'full'}
];
