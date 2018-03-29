import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ISettings } from '../../models/isettings';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: ISettings;


  constructor(
    private settingsService: SettingsService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.settings = this.settingsService.getSetting();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('Settings Changed', { cssClass: 'alert-success', timeout: 3000 });
  }

}
