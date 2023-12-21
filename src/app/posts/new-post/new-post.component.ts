import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  permalink :string = "";
  imgSrc: any = "./assets/image.jpg";
  selectedImage:any;

  onTitleChange($event: { target: any; }) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');

  }

  showPreview($event: { target: any; }){
    const reader = new FileReader();
    reader.onload= (e :any) =>{
        this.imgSrc = e.target.result;
    }

    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImage = $event.target.files[0];

  }

}
