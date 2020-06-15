import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.scss']
})
export class RemoveCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private utilityService: UtilityService
  ) { }

  categories = [];

  ngOnInit(): void {
    new Promise((resolve, reject)=>{
      this.categoryService.getCategories().then((res)=>{
        this.categories = res['categories'];
        console.log(this.categories);
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

  delete(categoryId: any){
    this.utilityService.asyncNotification('Please wait while we reomve the category', new Promise((resolve, reject)=>{
      this.categoryService.removeCategory(categoryId).then((res)=>{
        this.removeFromList(categoryId);
        resolve(this.utilityService.resolveAsyncPromise('Category Removed!'));
      }).catch((err)=>{
        reject(this.utilityService.rejectAsyncPromise('There was some error in removing the category, please try again later!'));
      })
    }))
  }


  removeFromList(categoryId: any){
    var index = -1;
    for (var i = 0; i < this.categories.length; i++){
      if (this.categories[i]._id == categoryId){
        index = i;
        break;
      }
    }

    if (index > -1){
      this.categories.splice(index, 1);
    }
  }

}
