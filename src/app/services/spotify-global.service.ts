import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyGlobalService {
  constructor(private http: HttpClient) {}

  public getQuery(query: string, token: string | null) {
    // common url
    const url: string = `https://api.spotify.com/v1/${query}`;

    // header to specify token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // execute request
    return this.http.get(url, { headers });
  }
}
