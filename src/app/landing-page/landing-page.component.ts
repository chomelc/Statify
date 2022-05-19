import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  // title: string = "Spotistics";
  title: string = 'Statify';
  isLoggedIn: boolean = false;
  accessToken: string = '';
  refreshToken: string = '';

  constructor(
    private route: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'spotify-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/img/spotify.svg'
      )
    );
  }

  ngOnInit(): void {
    // retrieve authorization parameters
    this.route.queryParams.subscribe((params) => {
      this.accessToken = params['access_token'];
      this.refreshToken = params['refresh_token'];
    });

    if (this.accessToken && this.refreshToken) {
      this.isLoggedIn = true;
    }
  }

  public logout() {
    this.isLoggedIn = false;
  }
}
