import { Component, Input, OnInit } from '@angular/core';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { TopTracksService } from '../services/top-tracks.service';

@Component({
  selector: 'app-six-months-stats',
  templateUrl: './six-months-stats.component.html',
  styleUrls: ['./six-months-stats.component.css'],
})
export class SixMonthsStatsComponent implements OnInit {
  @Input() accessToken!: string;
  tracks?: FormattedSavedTracks;
  avgPopularity = 0;

  constructor(private topTracksService: TopTracksService) {}

  ngOnInit(): void {
    this.getTopTracks();
  }

  getTopTracks(): void {
    this.topTracksService
      .getTopTracks6Months(this.accessToken)
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
