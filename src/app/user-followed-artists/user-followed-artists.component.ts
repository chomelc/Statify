import { Component, Input, OnInit } from '@angular/core';
import { FormattedFollowingArtists } from '../models/user-following-artists';
import { SpotifyUserFollowedArtistsService } from '../services/spotify-user-followed-artists.service';
import { WebStorageService } from '../services/web-storage.service';

@Component({
  selector: 'app-user-followed-artists',
  templateUrl: './user-followed-artists.component.html',
  styleUrls: ['./user-followed-artists.component.css'],
})
export class UserFollowedArtistsComponent implements OnInit {
  artists?: FormattedFollowingArtists;
  artistsTotal = [{}];

  constructor(
    private webStorageService: WebStorageService,
    private spotifyUserFollowedArtistsService: SpotifyUserFollowedArtistsService
  ) {}

  ngOnInit(): void {
    this.getFollowedArtists();
  }

  getFollowedArtists(): void {
    this.spotifyUserFollowedArtistsService
      .getFollowing(this.webStorageService.get('ACCESS_TOKEN'))
      .subscribe((data: any) => {
        this.artists = data;
        this.artistsTotal = [
          { name: 'Followed artists', value: data.artists.total },
        ];
      });
  }
}
