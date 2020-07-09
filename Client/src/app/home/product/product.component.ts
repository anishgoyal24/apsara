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

  images: any = [];

  imageConfig = {
    btnClass: 'default', // The CSS class(es) that will apply to the buttons
    zoomFactor: 0.1, // The amount that the scale will be increased by
    containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
    wheelZoom: true, // If true, the mouse wheel can be used to zoom in
    allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
    allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
    btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
      zoomIn: 'fa fa-plus',
      zoomOut: 'fa fa-minus',
      rotateClockwise: 'fa fa-repeat',
      rotateCounterClockwise: 'fa fa-undo',
      next: 'fa fa-arrow-right',
      prev: 'fa fa-arrow-left',
      fullscreen: 'fa fa-arrows-alt',
    },
    btnShow: {
      zoomIn: true,
      zoomOut: true,
      rotateClockwise: false,
      rotateCounterClockwise: false,
      next: true,
      prev: true
    }
  };

  async ngOnInit() {
    for (var i = 1; i <= this.product.images; i++){
      this.images.push(environment.IMAGE_URL+ '/' + this.product.name.toLowerCase().replace(/\s/g, "") + i + '.jpg');
    }
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
