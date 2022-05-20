import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { FormattedSavedAlbums } from '../models/user-saved-albums';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyUserSavedAlbumsService {
  private tracksUrl: string = 'me/albums?limit=50';

  constructor(private spotifyGlobalService: SpotifyGlobalService) {}

  public getTracks(token: string | null): Observable<FormattedSavedAlbums> {
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
