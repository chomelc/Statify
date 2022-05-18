import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SpotifyLoginService } from '../services/spotify-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() isLoggedIn!: boolean;
  @Output() isLoggedInChange = new EventEmitter<boolean>();
  loginUrl: string = '';
  spotifyCode: string = '';
  spotifyState: string = '';
  @Input() accessToken!: string;
  @Output() accessTokenChange = new EventEmitter<string>();
  refreshToken: string = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private spotifyLoginService: SpotifyLoginService,
    private route: ActivatedRoute
  ) {
    this.matIconRegistry.addSvgIcon(
      "spotify-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/img/spotify.svg")
    );
  }

  ngOnInit(): void {
    // request user authorization through loginUrl
    this.loginUrl = this.spotifyLoginService.getAuthorizeUrl(environment.SPOTIFY_CLIENT_ID, "http://localhost:4200/login");

    // retrieve authorization parameters
    this.route.queryParams
      .subscribe(params => {
        this.spotifyCode = params['code'];
        this.spotifyState = params['state'];
      }
      );

    if (this.spotifyCode && this.spotifyState) {
      this.getAccessToken();
    }
  }

  public getAccessToken() {
    this.spotifyLoginService.getAccessToken(
      environment.SPOTIFY_CLIENT_ID,
      environment.SPOTIFY_CLIENT_SECRET,
      this.spotifyCode,
      this.spotifyState,
      "http://localhost:4200/login").subscribe((data: any) => {
        this.accessToken = data['access_token'];
        this.accessTokenChange.emit(data['access_token']);
        this.refreshToken = data['refresh_token'];
        this.isLoggedIn = true;
        this.isLoggedInChange.emit(true);
      }
      );
  }
}
