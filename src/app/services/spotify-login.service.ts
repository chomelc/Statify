import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { stringify } from 'query-string';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length: number): string {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {
  constructor(private http: HttpClient) { }

  public getAuthorizeUrl(client_id: string, redirect_uri: string): string {
    // login url
    let url: string = 'https://accounts.spotify.com/authorize?';
    const scopes = 'user-read-private user-read-email user-follow-read user-library-read';
    const state = generateRandomString(16);

    url += 'response_type=code';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=true'

    return url;
  }

  public getAccessToken(client_id: string, client_secret: string, code: string, state: string, redirect_uri: string) {
    let url: string = 'https://accounts.spotify.com/api/token';

    const body = {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, stringify(body), { headers })
      .pipe(map((response) => response));
  }
}
