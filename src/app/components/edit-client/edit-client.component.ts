import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/iclient';
import { createViewChild } from '@angular/compiler/src/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { ISettings } from '../../models/isettings';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: IClient;
  @ViewChild('clientForm') form: any;
  settings: ISettings;

  constructor(
    private clientService: ClientService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsServices: SettingsService
  ) { }

  ngOnInit() {
    this.client = this.clientService.initClient();
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(
      client => {
        this.client = client;
      }
    );
    this.settings = this.settingsServices.getSetting();
  }

  onEditSubmit({ value, valid }: { value: IClient, valid: boolean }) {
    console.log(value, valid);
    if (!valid) {
      this.flashMessagesService.show('Form incorrectly completed', { cssClass: 'alert-danger', timeout: 3000 });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessagesService.show('Client Form Submitted', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}


