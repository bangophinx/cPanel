import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { IClient } from '../models/iclient';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<IClient>;
  clientDoc: AngularFirestoreDocument<IClient>;
  clients: Observable<IClient[]>;
  client: Observable<IClient>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection(
      'clients', ref => ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<IClient[]> {
    this.clients = this.clientsCollection.snapshotChanges().map(
      changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as IClient;
          data.id = action.payload.doc.id;
          return data;
        });
      }
    );
    return this.clients;
  }

  newClient(client: IClient) {
    this.clientsCollection.add(client);
  }

  initClient(){
    const client : IClient = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
    }

    return client;
  }

  getClient(id: string): Observable<IClient>{
    this.clientDoc = this.afs.doc<IClient>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().map(
      action => {
        if (action.payload.exists === false) {
          return null          
        } else {
          const data = action.payload.data() as IClient;
          data.id = action.payload.id;
          return data;
        }
      }
    );
    return this.client;          
  }

  updateClient(client: IClient) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: IClient) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
