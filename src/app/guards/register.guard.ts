import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  canActivate() {
      if (this.settingsService.getSetting().allowRegistration) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false; 
      }
  }

}