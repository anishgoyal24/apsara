import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
