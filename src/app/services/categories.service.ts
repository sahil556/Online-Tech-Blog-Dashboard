import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor(private angularfirestore: AngularFirestore, private toastr: ToastrService) { }
  saveCategory(data:Category){
    this.angularfirestore.collection('categories').add(data).then(docRef=>{
      this.toastr.success('Category Added Successfully');
    })
    .catch(err =>{
      this.toastr.warning("Something Went Wrong !");
    })
  }

  loadData(){
    return this.angularfirestore.collection('categories').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  updateData(id:string, editedData:Category){
    // following is simpler query.
    // this.angularfirestore.doc(`categories/${id}`).update(editedData);
    this.angularfirestore.collection('categories').doc(id).update(editedData).then(docRef =>{
      this.toastr.success("Category Updated Successfully !")
    })
    .catch(err =>{
      this.toastr.warning("Something Went Wrong..!");
    })
  }

  deleteData(id:string)
  {
    this.angularfirestore.collection('categories').doc(id).delete().then(docref=>{
      this.toastr.success("Category Deleted Successfully !")
    })
    .catch(err =>{
      this.toastr.error("Category Deletion Failed...!");
    })
  }
}
