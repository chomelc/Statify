import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root',
})
export class TopTracksService {
  private baseTracksUrl: string = 'me/top/tracks?limit=50';
  private baseFeaturesUrl: string = 'audio-features?ids=';

  constructor(private spotifyGlobalService: SpotifyGlobalService) {}

  public getTopTracks4Weeks(token: string): Observable<FormattedSavedTracks> {
    let tracksUrl = this.baseTracksUrl + '&time_range=short_term';
    return this.spotifyGlobalService.getQuery(tracksUrl, token).pipe(
      map((res: any) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return {
            href: res.href,
            items: res.items,
            limit: res.limit,
            next: res.next,
            offset: res.offset,
            previous: res.previous,
            total: res.total,
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  public getTopTracks6Months(token: string): Observable<FormattedSavedTracks> {
    let tracksUrl = this.baseTracksUrl + '&time_range=medium_term';
    return this.spotifyGlobalService.getQuery(tracksUrl, token).pipe(
      map((res: any) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return {
            href: res.href,
            items: res.items,
            limit: res.limit,
            next: res.next,
            offset: res.offset,
            previous: res.previous,
            total: res.total,
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  public getTopTracksAllTime(token: string): Observable<FormattedSavedTracks> {
    let tracksUrl = this.baseTracksUrl + '&time_range=long_term';
    return this.spotifyGlobalService.getQuery(tracksUrl, token).pipe(
      map((res: any) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return {
            href: res.href,
            items: res.items,
            limit: res.limit,
            next: res.next,
            offset: res.offset,
            previous: res.previous,
            total: res.total,
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  public getAudioFeatures(token: string, trackIds: string) {
    let featuresUrl = this.baseFeaturesUrl + trackIds;
    return this.spotifyGlobalService.getQuery(featuresUrl, token).pipe(
      map((res: any) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return {
            audio_features: res.audio_features,
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }
}
