import { Component, Input, OnInit } from '@angular/core';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { SpotifyUserSavedTracksService } from '../services/spotify-user-saved-tracks.service';

@Component({
  selector: 'app-user-saved-tracks',
  templateUrl: './user-saved-tracks.component.html',
  styleUrls: ['./user-saved-tracks.component.css']
})
export class UserSavedTracksComponent implements OnInit {
  @Input() accessToken!: string;
  tracks? : FormattedSavedTracks;
  constructor(private spotifyUserSavedTracksService : SpotifyUserSavedTracksService) { }

  ngOnInit(): void {
    this.getSavedTracks();
  }

  getSavedTracks():void {
    this.spotifyUserSavedTracksService.getTracks(this.accessToken).subscribe((data: any) => {
      this.tracks = data;
    })
  }
}
