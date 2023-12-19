import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private angularfirestore: AngularFirestore)
  {

  }
  onSubmit(formData:any):void{
    console.log(formData.value);

    // store below object in firestore
    let categoryData = {
      category: formData.value.category
    }
    this.angularfirestore.collection('categories').add(categoryData).then(docRef=>{
      console.log(docRef);
    })
    .catch(err =>{
      console.log(err);
    })
    
  }
}
