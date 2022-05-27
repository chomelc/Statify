import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar,
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
    if (
      this.route.snapshot.queryParams['access_token'] &&
      this.route.snapshot.queryParams['refresh_token']
    ) {
      this.route.queryParams.subscribe((params) => {
        this.webStorageService.set('ACCESS_TOKEN', params['access_token']);
        this.webStorageService.set('REFRESH_TOKEN', params['refresh_token']);
      });
    } else {
      this.logout();
    }

    if (
      this.webStorageService.get('ACCESS_TOKEN') &&
      this.webStorageService.get('REFRESH_TOKEN')
    ) {
      this.isLoggedIn = true;
      this.openSnackBar('Logged in successfully.', 'OK');
    }
  }

  public logout() {
    this.isLoggedIn = false;
    this.webStorageService.clear();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['login-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
