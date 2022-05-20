import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { LoginComponent } from './login/login.component';
import { SpotifyGlobalService } from './services/spotify-global.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SpotifyProfileService } from './services/spotify-profile.service';
import { UserPlaylistsComponent } from './user-playlists/user-playlists.component';
import { SpotifyUserPlaylistsService } from './services/spotify-user-playlists.service';
import { UserFollowedArtistsComponent } from './user-followed-artists/user-followed-artists.component';
import { SpotifyUserFollowedArtistsService } from './services/spotify-user-followed-artists.service';
import { UserSavedTracksComponent } from './user-saved-tracks/user-saved-tracks.component';
import { SpotifyUserSavedTracksService } from './services/spotify-user-saved-tracks.service';
import { FlagEmojiPipe } from './pipes/flag-emoji.pipe';
import { UserSavedAlbumsComponent } from './user-saved-albums/user-saved-albums.component';
import { SpotifyUserSavedAlbumsService } from './services/spotify-user-saved-albums.service';
import { StatsPanelComponent } from './stats-panel/stats-panel.component';
import { FourWeeksStatsComponent } from './four-weeks-stats/four-weeks-stats.component';
import { SixMonthsStatsComponent } from './six-months-stats/six-months-stats.component';
import { AllTimeStatsComponent } from './all-time-stats/all-time-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    ProfileComponent,
    UserPlaylistsComponent,
    UserFollowedArtistsComponent,
    UserSavedTracksComponent,
    FlagEmojiPipe,
    UserSavedAlbumsComponent,
    StatsPanelComponent,
    FourWeeksStatsComponent,
    SixMonthsStatsComponent,
    AllTimeStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    NgxChartsModule,
  ],
  providers: [
    SpotifyGlobalService,
    SpotifyProfileService,
    SpotifyUserPlaylistsService,
    SpotifyUserFollowedArtistsService,
    SpotifyUserSavedTracksService,
    SpotifyUserSavedAlbumsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
