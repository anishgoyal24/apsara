import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
  ) { }

  categories = [];

  filters = [];

  @Output('filters') filterOutput: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(){
    new Promise((resolve, reject)=>{
      this.categoryService.getCategories().then((res)=>{
        this.categories = res['categories'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }


  toggleFilter($event){
    if ($event.checked == true){
      this.filters.push($event.source.id);
    }
    else{
      const index = this.filters.indexOf($event.source.id);
      if (index > -1) {
        this.filters.splice(index, 1);
      }
    }
  }

  applyFilters(){
    this.filterOutput.emit(this.filters);
  }

}
