import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth';
import { reject } from 'q';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData),
    err => reject(err))
    });
  }

  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

  register(email: string, password: string) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData),
    err => reject(err))
    });
  }
  
}
