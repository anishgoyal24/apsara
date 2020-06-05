import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get Featured Products
   */
  getFeaturedProducts(){
    return this.http.get(environment.PRODUCT_URL + '/featured').toPromise();
  }

  /**
   * Get product by categories/filters
   * @param categories list of category ids
   */
  getFilteredProducts(categories: any){
    return this.http.post(environment.PRODUCT_URL + '/by-category', {categories}).toPromise();
  }

  /**
   * Search product by name/category
   * @param query 
   */
  search(query: string){
    return this.http.get(environment.PRODUCT_URL + '/search', {
      params: {query}
    }).toPromise();
  }
}
