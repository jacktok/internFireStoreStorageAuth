import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { storage } from 'firebase';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Output() CraetePost: EventEmitter<Post> = new EventEmitter()
  uuid: string;
  constructor(private postService: PostService,
    private afStorage: AngularFireStorage) {
    this.uuid = this.postService.createUID;
    // this.uuid = "iO69d8yVI8Bgr4VNy8bC"
  }
  ngOnInit() {
  }

  content: string
  fileList: string[] = []

  disableUpload: boolean = false
  upload(fileIn) {
    if (fileIn.files[0] != null) {
      console.log(fileIn)
      this.disableUpload = true;
      const file = fileIn.files[0];
      const filePath = "post/" + this.uuid + "/" + this.postService.createUID
      this.afStorage.upload(filePath, file).then(_ => {
        this.disableUpload = false
        this.fileList.push(filePath)
      })

    }
  }



}
