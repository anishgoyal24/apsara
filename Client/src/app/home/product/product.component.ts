import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  @Input('product') product: any;

  @Input('edit') editable: boolean = false;

  @Output('delete') deleteEmitter = new EventEmitter();

  ngOnInit(): void {
  }

  delete(productId){
    new Promise((resolve, reject)=>{
      this.productService.deleteProduct(productId).then((res)=>{
        console.log(res);
        this.deleteEmitter.emit(productId);
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }
}
