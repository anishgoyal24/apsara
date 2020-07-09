import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { CategoryService } from 'src/shared/services/category.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private utilityService: UtilityService
  ) { }

  productDetails ={
    name: '',
    category: [],
    url: '',
    description: '',
    type: 'Wholesale',
    featured: false
  }

  type: string;

  imageUploaded: Boolean;

  categories = [];

  ngOnInit(): void {
    this.imageUploaded = false;
    new Promise((resolve, reject)=>{
      this.categoryService.getCategories().then((res)=>{
        this.categories = res['categories'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

  onAttach($event){
    var image = $event.target.files[0];
    var filename = this.productDetails.name.toLowerCase().replace(/\s/g, "");
    this.utilityService.asyncNotification('Uploading image...', new Promise((resolve, reject)=>{
      this.productService.uploadPhoto(image, filename).then((res)=>{
        this.imageUploaded = true;
        resolve(this.utilityService.resolveAsyncPromise('Image Successfully Uploaded!'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error in uploading the image. Please try again later!'));
      })
    }))
  }

  onCreateProduct(productDetails){
    this.utilityService.asyncNotification("Creating product please wait...", new Promise((resolve, reject)=>{
      this.productService.createProduct(productDetails).then((res)=>{
        resolve(this.utilityService.resolveAsyncPromise('Successfully Created Product!'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error in creating the product. Please try again later!'));
      })
    }))
  }


  toggleCategory($event: any){
    if ($event.checked == true){
      this.productDetails.category.push($event.source.id);
    }
    else{
      const index = this.productDetails.category.indexOf($event.source.id);
      if (index > -1) {
        this.productDetails.category.splice(index, 1);
      }
    }
  }

  toggleFeatured($event: any){
    if ($event.checked==true)this.productDetails.featured=true;
    else this.productDetails.featured=false;
  }

}
