import { Component } from '@angular/core';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUrl: string = 'http://localhost:8000/login';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "spotify-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/img/spotify.svg")
    );
  }
}
