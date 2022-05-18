import { Component, Input, OnInit } from '@angular/core';
import { FormattedProfile } from '../models/profile-model';
import { SpotifyProfileService } from '../services/spotify-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() accessToken!: string;
  profile!: FormattedProfile;
  flag: string = '';

  constructor(private spotifyProfileService: SpotifyProfileService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.spotifyProfileService.getProfile(this.accessToken).subscribe((data: any) => {
      this.profile = data;
    });
  }
}
