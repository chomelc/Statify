import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormattedProfile } from '../models/profile-model';
import { SpotifyGlobalService } from './spotify-global.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyProfileService {
  private profileUrl: string = 'me';

  constructor(private spotifyGlobalService: SpotifyGlobalService) {}

  public getProfile(token: string | null): Observable<FormattedProfile> {
    return this.spotifyGlobalService.getQuery(this.profileUrl, token).pipe(
      map((res: any) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return {
            country: res.country,
            display_name: res.display_name,
            email: res.email,
            explicit_content: res.explicit_content,
            external_urls: res.external_urls,
            followers: res.followers,
            href: res.href,
            id: res.id,
            images: res.images,
            product: res.product,
            type: res.type,
            uri: res.uri,
          };
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }
}
