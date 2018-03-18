import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { IClient } from '../models/iclient';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<IClient>;
  clientsDoc: AngularFirestoreDocument<IClient>;
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

}
