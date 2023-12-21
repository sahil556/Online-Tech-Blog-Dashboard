import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryArray?: Array<{id:string, data:any}>;
  formCategory:string = "";
  formStatus:string = "Add";
  categoryId :string = "";
  constructor(private categoryservice: CategoriesService) { }

  ngOnInit(): void {
    this.categoryservice.loadData().subscribe(val => {
      this.categoryArray = val;
    });
  }

  
  onSubmit(formData: any): void {
    // store below object in firestore
    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add')
    {
      this.categoryservice.saveCategory(categoryData);
    }
    else if(this.formStatus == 'Edit')
    {
      this.categoryservice.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
    }
    formData.reset();
  }

  onEdit(category:string, id:string){
    console.log(category)
    this.formCategory = category;
    this.categoryId = id;
    this.formStatus = "Edit";
  }
  
  onDelete(id: string)
  {
    this.categoryservice.deleteData(id);
  }
}
