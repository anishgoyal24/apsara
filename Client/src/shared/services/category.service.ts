import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Function to retrieve categories list
   */
  getCategories(){
    return this.http.get(environment.CATEGORY_URL + '/').toPromise();
  }

  /**
   * Add a new category
   * @param categoryName 
   */
  addCategory(categoryName){
    return this.http.post(environment.CATEGORY_URL + '/add', {categoryName}).toPromise();
  }

  /**
   * Remove a category
   * @param categoryId CategoryId of the category to be removed
   */
  removeCategory(categoryId: any){
    return this.http.post(environment.CATEGORY_URL + '/remove', {categoryId}).toPromise();
  }
}
