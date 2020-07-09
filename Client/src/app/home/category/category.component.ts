import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { CompanyService } from 'src/shared/services/company.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private companyService: CompanyService
  ) { }

  @Input('company') company : boolean = false;

  categories = [];

  companies = [];

  filters = [];

  filtersCompany = [];

  expanded: boolean = false;

  expandedCompany: boolean = false;

  arrow: string = "keyboard_arrow_down";

  arrowCompany: string = "keyboard_arrow_down";

  @Output('filters') filterOutput: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (this.company == false)this.fetchCategories();
    else this.fetchCompanies();
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

  fetchCompanies(){
    new Promise((resolve, reject)=>{
      this.companyService.getCompanies().then((res)=>{
        this.companies = res['companies'];
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

  toggleFilterCompany($event){
    if ($event.checked == true){
      this.filtersCompany.push($event.source.id);
    }
    else{
      const index = this.filtersCompany.indexOf($event.source.id);
      if (index > -1) {
        this.filtersCompany.splice(index, 1);
      }
    }
  }

  applyFilters(){
    this.filterOutput.emit({category: this.filters, company: this.filtersCompany});
  }

  toggleExpanded(){
    this.expanded = !this.expanded;
    if (this.arrow=="keyboard_arrow_down"){
      this.arrow = "keyboard_arrow_up";
    }
    else this.arrow = "keyboard_arrow_down";
  }

  toggleExpandedCompany(){
    this.expandedCompany = !this.expandedCompany;
    if (this.arrowCompany=="keyboard_arrow_down"){
      this.arrowCompany = "keyboard_arrow_up";
    }
    else this.arrowCompany = "keyboard_arrow_down";
  }

}
