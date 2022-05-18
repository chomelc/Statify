import { Component, Input, OnInit } from '@angular/core';
import { FormattedFollowingArtists } from '../models/user-following-artists';
import { SpotifyUserFollowedArtistsService } from '../services/spotify-user-followed-artists.service';

@Component({
  selector: 'app-user-followed-artists',
  templateUrl: './user-followed-artists.component.html',
  styleUrls: ['./user-followed-artists.component.css']
})
export class UserFollowedArtistsComponent implements OnInit {
  @Input() accessToken!: string;
  artists?: FormattedFollowingArtists;
  constructor(private spotifyUserFollowedArtistsService: SpotifyUserFollowedArtistsService) { }

  ngOnInit(): void {
    this.getFollowedArtists();
  }

  getFollowedArtists(): void {
    this.spotifyUserFollowedArtistsService.getFollowing(this.accessToken).subscribe((data: any) => {
      this.artists = data;
    })
  }
}
