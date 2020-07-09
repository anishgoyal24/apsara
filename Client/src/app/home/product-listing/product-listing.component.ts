import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  products = [];

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  filterProducts(filters: any){
    new Promise((resolve, reject)=>{
      this.productService.getFilteredProducts(filters).then((res)=>{
        this.products = res['products'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }


  getFeaturedProducts(){
    new Promise((resolve, reject)=>{
      this.productService.getFeaturedProducts().then((res)=>{
        this.products = res['products'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

  setProducts(products){
    this.products = products;
  }

}
