import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  postList: Observable<any>
  constructor(private postSerice: PostService) {
    this.postList = postSerice.getPosts();
  }

  ngOnInit() {
  }

}
