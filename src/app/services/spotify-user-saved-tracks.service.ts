import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { FormattedSavedTracks } from '../models/user-saved-tracks';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyUserSavedTracksService {

  private tracksUrl: string = 'me/tracks';

  constructor(private spotifyGlobalService: SpotifyGlobalService) { }

  public getTracks(token: string): Observable<FormattedSavedTracks> {
    return this.spotifyGlobalService.getQuery(this.tracksUrl, token).pipe(
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
            total: res.total
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      }));
  }
}
