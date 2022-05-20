import { Component, Input, OnInit } from '@angular/core';
import { FormattedPlaylists } from '../models/user-playlists-model';
import { SpotifyUserPlaylistsService } from '../services/spotify-user-playlists.service';
import { WebStorageService } from '../services/web-storage.service';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css'],
})
export class UserPlaylistsComponent implements OnInit {
  @Input() userId?: string;
  playlists?: FormattedPlaylists;
  playlistsTotal = [{}];

  constructor(
    private webStorageService: WebStorageService,
    private spotifyUserPlaylistsService: SpotifyUserPlaylistsService
  ) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.spotifyUserPlaylistsService
      .getPlaylists(this.userId, this.webStorageService.get('ACCESS_TOKEN'))
      .subscribe((data: any) => {
        this.playlists = data;
        this.playlistsTotal = [{ name: 'Playlists', value: data.total }];
      });
  }
}
