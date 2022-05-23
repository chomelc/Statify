import { Component, OnInit } from '@angular/core';
import { FormattedProfile } from '../models/profile-model';
import { SpotifyProfileService } from '../services/spotify-profile.service';
import { WebStorageService } from '../services/web-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile?: FormattedProfile;
  followers: { name: string; value: any }[] = [];

  constructor(
    private spotifyProfileService: SpotifyProfileService,
    private webStorageService: WebStorageService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.spotifyProfileService
      .getProfile(this.webStorageService.get('ACCESS_TOKEN'))
      .subscribe((data: any) => {
        this.profile = data;
        this.followers = [{ name: 'Followers', value: data.followers.total }];
      });
  }
}
