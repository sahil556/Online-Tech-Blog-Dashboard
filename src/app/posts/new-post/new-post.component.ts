import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  permalink :string = "";
  imgSrc: any = "./assets/image.jpg";
  selectedImage:any;
  categoryArray?: Array<{id:string, data:any}>;
  postForm: FormGroup;

  constructor(private categoryService: CategoriesService, private fb: FormBuilder, private postservice: PostService){
    this.postForm = this.fb.group({
      title:['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt:['', [Validators.required, Validators.minLength(50)]],
      category:['', Validators.required],
      postImg:['', Validators.required],
      content:['', Validators.required]
    })
  }

  ngOnInit(){
    this.categoryService.loadData().subscribe(val =>{
      this.categoryArray = val;
    })
  }

  onSubmit()
  {
    let splitted = this.postForm.value.category.split('-');
    const postData:Post ={
      title :this.postForm.value.title,
      permalink :this.postForm.value.permalink,
      category:{
        categoryId: splitted[0],
        category:splitted[1]
      },
      postImgPath :'',
      content :this.postForm.value.content,
      excerpt :this.postForm.value.excerpt,
      isFeatured:false,
      views:0,
      createdAt:new Date(),
      status: 'new'
    }
    console.log(postData)
    this.postservice.uploadImage(this.selectedImage, postData);
    this.postForm.reset();
    this.imgSrc = "./assets/image.jpg";
  }

  get fc()
  {
    return this.postForm.controls;
  }

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
