import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { FormattedFollowingArtists } from '../models/user-following-artists';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyUserFollowedArtistsService {

  private followingUrl: string = 'me/following?type=artist';

  constructor(private spotifyGlobalService: SpotifyGlobalService) { }

  public getFollowing(token: string): Observable<FormattedFollowingArtists> {
    return this.spotifyGlobalService.getQuery(this.followingUrl, token).pipe(
      map((res: any) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return {
            artists : res.artists
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      }));
  }
}
