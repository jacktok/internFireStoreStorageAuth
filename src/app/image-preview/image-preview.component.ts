import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  @Input() filePath: string
  previewLink: Observable<string>;
  constructor(private afStorage: AngularFireStorage) {
   
  }

  ngOnInit() {
    console.log(this.filePath)
    this.previewLink = this.afStorage.ref(this.filePath).getDownloadURL()
  }


  clipLink(): void {
    console.log("clip link")
    this.previewLink.subscribe(link => this.copyMessage(link))
  }
  
  private copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
