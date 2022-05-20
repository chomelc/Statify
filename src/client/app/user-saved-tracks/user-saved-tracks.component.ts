import { Component, Input, OnInit } from '@angular/core';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { SpotifyUserSavedTracksService } from '../services/spotify-user-saved-tracks.service';
import { WebStorageService } from '../services/web-storage.service';

@Component({
  selector: 'app-user-saved-tracks',
  templateUrl: './user-saved-tracks.component.html',
  styleUrls: ['./user-saved-tracks.component.css'],
})
export class UserSavedTracksComponent implements OnInit {
  tracks?: FormattedSavedTracks;
  tracksTotal = [{}];

  constructor(
    private webStorageService: WebStorageService,
    private spotifyUserSavedTracksService: SpotifyUserSavedTracksService
  ) {}

  ngOnInit(): void {
    this.getSavedTracks();
  }

  getSavedTracks(): void {
    this.spotifyUserSavedTracksService
      .getTracks(this.webStorageService.get('ACCESS_TOKEN'))
      .subscribe((data: any) => {
        this.tracks = data;
        this.tracksTotal = [{ name: 'Saved tracks', value: data.total }];
      });
  }
}
