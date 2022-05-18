import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { LoginComponent } from './login/login.component';
import { SpotifyGlobalService } from './services/spotify-global.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SpotifyLoginService } from './services/spotify-login.service';
import { ProfileComponent } from './profile/profile.component';
import { SpotifyProfileService } from './services/spotify-profile.service';
import { UserPlaylistsComponent } from './user-playlists/user-playlists.component';
import { SpotifyUserPlaylistsService } from './services/spotify-user-playlists.service';
import { UserFollowedArtistsComponent } from './user-followed-artists/user-followed-artists.component';
import { SpotifyUserFollowedArtistsService } from './services/spotify-user-followed-artists.service';
import { UserSavedTracksComponent } from './user-saved-tracks/user-saved-tracks.component';
import { SpotifyUserSavedTracksService } from './services/spotify-user-saved-tracks.service';
import { FlagEmojiPipe } from './pipes/flag-emoji.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    ProfileComponent,
    UserPlaylistsComponent,
    UserFollowedArtistsComponent,
    UserSavedTracksComponent,
    FlagEmojiPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    SpotifyGlobalService,
    SpotifyLoginService,
    SpotifyProfileService,
    SpotifyUserPlaylistsService,
    SpotifyUserFollowedArtistsService,
    SpotifyUserSavedTracksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
