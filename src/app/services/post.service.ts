import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularfirestorage: AngularFireStorage, private angularfirestore: AngularFirestore, private toast: ToastrService) { }

  uploadImage(selectedImage: any, postData: Post) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(postData)
    this.angularfirestorage.upload(filePath, selectedImage).then(() => {
      console.log('post Image Uploaded Successfully...');
      this.angularfirestorage.ref(filePath).getDownloadURL().subscribe(url => {
        postData.postImgPath = url;
        this.saveData(postData);
      })
    })
  }
  saveData(postData: Post) {
    this.angularfirestore.collection('posts').add(postData).then(docRef => {
      this.toast.success('Data Inserted Successfully !')
    })
      .catch(err => {
        this.toast.error("Failed to Insert Data !")
      });
  }

}
