import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/iclient';
import { createViewChild } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  client: IClient;
  diableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.client = this.clientService.initClient();

  }

  onSubmit({value, valid}: {value: IClient, valid:boolean}){

    if(this.diableBalanceOnAdd){
      value.balance = 0;
    }
    
    if (!valid) {
      this.flashMessagesService.show('Form incorrectly completed', { cssClass: 'alert-danger', timeout: 3000 });
    } else{
      this.clientService.newClient(value);
      this.router.navigate(['/']);
      this.flashMessagesService.show('Client Form Submitted', { cssClass: 'alert-success', timeout: 3000 });
    }

    console.log(value, valid);


  }

}
