import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private utilityService: UtilityService
  ) { }

  categoryName: string;

  ngOnInit(): void {
  }

  onCreateCategory(categoryName){
    this.utilityService.asyncNotification('Adding category please wait...', new Promise((resolve, reject)=>{
      this.categoryService.addCategory(categoryName).then((res)=>{
        console.log(res);
        resolve(this.utilityService.resolveAsyncPromise('Category Added!'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error adding the category. Please try again later!'));
      })
    }))
  }

}
