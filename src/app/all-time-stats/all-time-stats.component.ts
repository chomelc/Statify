import { Component, Input, OnInit } from '@angular/core';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { TopTracksService } from '../services/top-tracks.service';

@Component({
  selector: 'app-all-time-stats',
  templateUrl: './all-time-stats.component.html',
  styleUrls: ['./all-time-stats.component.css'],
})
export class AllTimeStatsComponent implements OnInit {
  @Input() accessToken!: string;
  tracks?: FormattedSavedTracks;
  avgPopularity = 0;

  constructor(private topTracksService: TopTracksService) {}

  ngOnInit(): void {
    this.getTopTracks();
  }

  getTopTracks(): void {
    this.topTracksService
      .getTopTracksAllTime(this.accessToken)
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
