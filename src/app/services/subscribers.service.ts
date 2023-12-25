import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Toast, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private angularfirestore: AngularFirestore, private toastr: ToastrService) { }

  loadData(){
    return this.angularfirestore.collection('subscribers').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  deleteData(id:string)
  {
    this.angularfirestore.collection('subscribers').doc(id).delete().then(docref=>{
      this.toastr.success("Subscriber Deleted Successfully !")
    })
    .catch(err =>{
      this.toastr.error("Subscriber Deletion Failed...!");
    })
  }
}
