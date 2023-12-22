import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularfirestorage: AngularFireStorage, private angularfirestore: AngularFirestore, private toast: ToastrService, private router: Router) { }

  uploadImage(selectedImage: any, postData: Post, formStatus: string, id:string) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(postData)
    this.angularfirestorage.upload(filePath, selectedImage).then(() => {
      console.log('post Image Uploaded Successfully...');
      this.angularfirestorage.ref(filePath).getDownloadURL().subscribe(url => {
        postData.postImgPath = url;
        if(formStatus == 'Edit')
        {
          this.updateData(postData, id);
        }
        else
        {
        this.saveData(postData);
        }

      })
    })
  }


  saveData(postData: Post) {
    this.angularfirestore.collection('posts').add(postData).then(docRef => {
      this.toast.success('Data Inserted Successfully !')
      this.router.navigate(['/posts']);
    })
      .catch(err => {
        this.toast.error("Failed to Insert Data !")
      });
  }

  loadData()
  {
    return this.angularfirestore.collection('posts').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadOneData(id: string)
  {
    return this.angularfirestore.collection('posts').doc(id).valueChanges();
  }

  updateData(postData : Post, id:string)
  {
    this.angularfirestore.doc(`posts/${id}`).update(postData).then(docRef =>{
      this.toast.success("Post Updated Successfully !");
      this.router.navigate(['/posts']);
    })
    .catch(err =>{
      this.toast.success("Something Went Wrong !")
    })
  }

  deleteImage(postImgPath:string, id:string)
  {
    this.angularfirestorage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id);
    })
  }
  deleteData(id: string)
  {
    this.angularfirestore.doc(`posts/${id}`).delete().then(docRef =>{
      this.toast.warning("Post Deleted Successfully !");
    })
  }

  markFeatured(id:string, featuredData: any){
    this.angularfirestore.doc(`posts/${id}`).update(featuredData).then(()=>{
      this.toast.info("Featured Status Updated")
    })
  }

}
