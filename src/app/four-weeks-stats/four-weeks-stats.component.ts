import { Component, Input, OnInit } from '@angular/core';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { TopTracksService } from '../services/top-tracks.service';

@Component({
  selector: 'app-four-weeks-stats',
  templateUrl: './four-weeks-stats.component.html',
  styleUrls: ['./four-weeks-stats.component.css'],
})
export class FourWeeksStatsComponent implements OnInit {
  @Input() accessToken!: string;
  tracks?: FormattedSavedTracks;
  avgPopularity = 0;

  constructor(private topTracksService: TopTracksService) {}

  ngOnInit(): void {
    this.getTopTracks();
  }

  getTopTracks(): void {
    this.topTracksService
      .getTopTracks4Weeks(this.accessToken)
      .subscribe((data: any) => {
        this.tracks = data;
        this.avgPopularity = this.getAveragePopularity();
      });
  }

  getAveragePopularity(): number {
    let sum = 0;
    if (this.tracks) {
      for (let item of this.tracks.items) {
        sum += item.popularity;
      }
    }
    return sum / 50;
  }

  valueFormatting = (data: any) => {
    return `${data.toString()}%`;
  };
}
