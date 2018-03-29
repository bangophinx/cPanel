import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IClient } from '../../models/iclient';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  showRegister: boolean;
  loggedInUser: string;

  constructor(
    private authService: AuthService,
    private flashmessage: FlashMessagesService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSetting().allowRegistration;
  }

  onLogOutClick() {
    this.authService.logOut();
    this.flashmessage.show("You have been Logged Out", {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(["/login"]);
  }

}
