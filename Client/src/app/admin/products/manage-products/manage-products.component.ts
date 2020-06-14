import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  products = []

  ngOnInit(): void {
  }

  setProducts(products: any){
    this.products = products;
  }

  deleteFromList(productId){
    var index = -1;
    for (var i = 0; i < this.products.length; i++){
      if (this.products[i]._id == productId){
        index = i;
      }
    }
    if (index > -1){
      this.products.splice(index, 1);
    }
  }
  

}
