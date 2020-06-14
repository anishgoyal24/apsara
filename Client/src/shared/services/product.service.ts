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


  /**
   * Upload product photo
   * @param image Image of the product
   * @param filename filename of the product
   */
  uploadPhoto(image, filename){
    var formData = new FormData();
    formData.append('image', image);
    return this.http.post(environment.UPLOAD_URL + '?filename=' + filename, formData).toPromise();
  }


  /**
   * Create a new product
   * @param productData Product Details
   */
  createProduct(productData: any){
    return this.http.post(environment.PRODUCT_URL + '/add', {productData}).toPromise();
  }


  /**
   * Delete Product
   * @param productId ProductId 
   */
  deleteProduct(productId: any){
    return this.http.post(environment.PRODUCT_URL + '/remove', {productId}).toPromise();
  }


  /**
   * Edit Product
   * @param productData 
   */
  editProduct(productData: any){
    return this.http.post(environment.PRODUCT_URL + '/edit', {productData}).toPromise();
  }
}
