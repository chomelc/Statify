import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormattedPlaylists } from '../models/user-playlists-model';
import { SpotifyUserPlaylistsService } from '../services/spotify-user-playlists.service';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css'],
})
export class UserPlaylistsComponent implements OnInit {
  @Input() userId?: string;
  @Input() accessToken!: string;
  playlists?: FormattedPlaylists;
  playlistsTotal = [{}];

  constructor(
    private spotifyUserPlaylistsService: SpotifyUserPlaylistsService
  ) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.spotifyUserPlaylistsService
      .getPlaylists(this.userId, this.accessToken)
      .subscribe((data: any) => {
        this.playlists = data;
        this.playlistsTotal = [{ name: 'Playlists', value: data.total }];
      });
  }
}
