import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { EventEmitter } from '@angular/core';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { EditDialogComponent } from '../../admin/products/manage-products/edit-dialog/edit-dialog.component';
import { UtilityService } from 'src/shared/services/utility.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private utilityService: UtilityService
  ) { }

  @Input('product') product: any;

  @Input('edit') editable: boolean = false;

  @Output('delete') deleteEmitter = new EventEmitter();

  imageUrl: string;

  ngOnInit(): void {
    this.imageUrl = environment.IMAGE_URL+ '/' + this.product.name.toLowerCase().replace(/\s/g, "") + '.jpg';
  }

  delete(productId){
    this.utilityService.asyncNotification('Deleting product please wait', new Promise((resolve, reject)=>{
      this.productService.deleteProduct(productId).then((res)=>{
        this.deleteEmitter.emit(productId);
        resolve(this.utilityService.resolveAsyncPromise('Successfully Deleted Product!'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error in deleting the product. Please try again later!'));
      })
    }))
  }

  openEditDialog(){
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.product
    });
  }
}
