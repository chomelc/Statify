import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  // title: string = "Spotistics";
  title: string = 'Statify';
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private webStorageService: WebStorageService
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
      this.webStorageService.set('ACCESS_TOKEN', params['access_token']);
      this.webStorageService.set('REFRESH_TOKEN', params['refresh_token']);
    });

    if (
      this.webStorageService.get('ACCESS_TOKEN') &&
      this.webStorageService.get('REFRESH_TOKEN')
    ) {
      this.isLoggedIn = true;
    }
  }

  public logout() {
    this.isLoggedIn = false;
  }
}
