import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {User} from './user';
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: Observable<User>;

  constructor(public  authService: AuthService, private postService: PostService) {
    this.user = authService.user;
  }

  login() {
    this.authService.googleLogin();
  }

  logout() {
    this.authService.singOut();
  }

}
