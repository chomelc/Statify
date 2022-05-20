import { Component, Input, OnInit } from '@angular/core';
import { FormattedSavedAlbums } from '../models/user-saved-albums';
import { SpotifyUserSavedAlbumsService } from '../services/spotify-user-saved-albums.service';
import { WebStorageService } from '../services/web-storage.service';

@Component({
  selector: 'app-user-saved-albums',
  templateUrl: './user-saved-albums.component.html',
  styleUrls: ['./user-saved-albums.component.css'],
})
export class UserSavedAlbumsComponent implements OnInit {
  albums?: FormattedSavedAlbums;
  albumsTotal = [{}];

  constructor(
    private webStorageService: WebStorageService,
    private spotifyUserSavedAlbumsService: SpotifyUserSavedAlbumsService
  ) {}

  ngOnInit(): void {
    this.getSavedTracks();
  }

  getSavedTracks(): void {
    this.spotifyUserSavedAlbumsService
      .getTracks(this.webStorageService.get('ACCESS_TOKEN'))
      .subscribe((data: any) => {
        this.albums = data;
        this.albumsTotal = [{ name: 'Saved albums', value: data.total }];
      });
  }
}
