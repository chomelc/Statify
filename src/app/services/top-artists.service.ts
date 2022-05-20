import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root',
})
export class TopArtistsService {
  private artistsUrl: string = 'me/top/artists?limit=50';

  constructor(private spotifyGlobalService: SpotifyGlobalService) {}

  public getTopArtists4Weeks(token: string): Observable<FormattedSavedTracks> {
    let url = this.artistsUrl + '&time_range=short_term';
    return this.spotifyGlobalService.getQuery(url, token).pipe(
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

  public getTopArtists6Months(token: string): Observable<FormattedSavedTracks> {
    let url = this.artistsUrl + '&time_range=medium_term';
    return this.spotifyGlobalService.getQuery(url, token).pipe(
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

  public getTopArtistsAllTime(token: string): Observable<FormattedSavedTracks> {
    let url = this.artistsUrl + '&time_range=long_term';
    return this.spotifyGlobalService.getQuery(url, token).pipe(
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
}
