import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/iclient';
import { createViewChild } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  client: IClient;
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.client = this.clientService.initClient();
    this.disableBalanceOnAdd = this.settingsService.getSetting().disableBalanceOnAdd;

  }

  onSubmit({value, valid}: {value: IClient, valid:boolean}){

    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    
    if (!valid) {
      this.flashMessagesService.show('Form incorrectly completed', { cssClass: 'alert-danger', timeout: 3000 });
    } else{
      this.clientService.newClient(value);
      this.router.navigate(['/']);
      this.flashMessagesService.show('Client Form Submitted', { cssClass: 'alert-success', timeout: 3000 });
    }
  }

}
