import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  query: string = "";

  @Output("products") products: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  search(){
    if (this.query==''){
      this.products.emit([]);
      return;
    }
    new Promise((resolve, reject)=>{
      this.productService.search(this.query).then((res)=>{
        this.products.emit(res['products']);
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

}
