import { Injectable, Input } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { FormattedPlaylists } from '../models/user-playlists-model';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyUserPlaylistsService {
  constructor(private spotifyGlobalService: SpotifyGlobalService) { }

  public getPlaylists(userId: string | undefined, token: string): Observable<FormattedPlaylists> {
    const playlistsUrl: string = `users/${userId}/playlists`;
    return this.spotifyGlobalService.getQuery(playlistsUrl, token).pipe(
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
