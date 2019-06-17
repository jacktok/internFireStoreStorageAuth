import { Injectable } from '@angular/core';
import { BehaviorSubject, from, observable, Observable, of, Subscribable } from 'rxjs';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'

import { switchMap, map, count } from 'rxjs/operators';
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null)

  userCollection = this.db.collection('users')

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore) {
    const x = this.afAuth.authState.pipe(
      switchMap((auth: firebase.User) => {
        if (auth) {
          return this.userCollection.doc(auth.uid).valueChanges()
        } else {
          return of(null)
        }
      })
    ).subscribe(user => this.user.next(user))
  }

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credentail => this.updateUser(credentail.user))
  }

  singOut() {
    this.afAuth.auth.signOut()
  }


  // auto create user
  private updateUser(userAuth: firebase.User) {
    
    console.log(userAuth)

    this.userCollection.doc(userAuth.uid).ref.get().then(userRef => {
      if (!userRef.exists) {
        this.userCollection.doc(userAuth.uid).set(Object.assign({}, new User(userAuth)))
      }
    })

  }
}
