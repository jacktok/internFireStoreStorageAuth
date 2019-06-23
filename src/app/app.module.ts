import {NgModule} from '@angular/core';
// firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from 'src/environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {FormsModule} from '@angular/forms';
import {ImagePreviewComponent} from './image-preview/image-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    EditPostComponent,
    PostsListComponent,
    CreatePostComponent,
    ImagePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
