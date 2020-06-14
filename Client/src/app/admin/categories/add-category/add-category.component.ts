import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  categoryName: string;

  ngOnInit(): void {
  }

  onCreateCategory(categoryName){
    new Promise((resolve, reject)=>{
      this.categoryService.addCategory(categoryName).then((res)=>{
        console.log(res);
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

}
