import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private auth: AuthService,
    private db: AngularFirestore) {
    this.auth.user.subscribe(user =>
      this.userRoles = _.keys(_.get(user, 'roles'))
    )
  }

  userRoles: Array<string>
  postCollection = this.db.collection('posts')

  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader']
    return this.matchingRole(allowed)
  }

  get canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed)
  }

  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  get createUID(): string {
    return this.db.createId();
  }

  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }

  getPosts(): Observable<object> {
    return this.postCollection.valueChanges()
  }

  getPost(key) {
    return this.postCollection.doc(key).get()
  }

  editPost(key, newPost) {
    if (this.canEdit) {
      return this.postCollection.doc(key).update(newPost)
    }
    else console.error("action prevented")
  }

  deletePost(key) {
    if (this.canDelete) {
      return this.postCollection.doc(key).delete()
    }
    else console.error("action prevented")
  }

  createPost(data) {
    if (this.canEdit) {
      const uuid = this.db.createId();
      this.postCollection.doc(uuid).set({ uuid, ...data })
    } else console.error("action prevented")
  }
}
