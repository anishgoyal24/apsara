import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { cloneDeep } from "lodash";
import { CategoryService } from 'src/shared/services/category.service';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  clonedData: any;

  categories = [];

  type: string;

  image: any;

  imageChanged: boolean = false;

  ngOnInit(): void {
    this.clonedData = cloneDeep(this.data);
    this.type = this.data.type;
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


  toggleFeatured($event){
    if ($event.checked==true)this.clonedData.featured=true;
    else this.clonedData.featured=false;
  }

  checkCategory(categoryId){
    if (this.clonedData.category.indexOf(categoryId) > -1) return true;
    else return false;
  }

  onEditProduct(data: any){

    var p1 = new Promise(()=>{
      this.productService.editProduct(data);
    });

    var p2 = new Promise(()=>{
      var filename = this.data.name.toLowerCase();
      this.productService.uploadPhoto(this.image, filename);
    })
    

    if (this.imageChanged){
      Promise.all([p1, p2]).then(()=>{
        console.log('Product Updated')
        this.dialogRef.close();
      }).catch((err)=>{
        console.log(err);
      });
    }

    else{
      Promise.all([p1]).then(()=>{
        console.log('Product Updated')
        this.dialogRef.close();
      }).catch((err)=>{
        console.log(err);
      })
    }

    // new Promise((resolve, reject)=>{
    //   this.productService.editProduct(data).then((res)=>{
    //     if (this.imageChanged == true){
    //       var filename = this.data.name.toLowerCase();
    //       this.productService.uploadPhoto(this.image, filename).then((res)=>{
    //         this.dialogRef.close();
    //         resolve();
    //       }).catch((err)=>{
    //         console.log(err);
    //       })
    //     }
    //   }).catch((err)=>{
    //     console.log(err);
    //     reject();
    //   })
    // })
  }

  close(){
    this.dialogRef.close();
  }

  onAttach($event){
    this.image = $event.target.files[0];
    this.imageChanged = true;
  }

  toggleCategory($event){
    if ($event.checked == true){
      this.clonedData.category.push($event.source.id);
    }
    else{
      var index = -1;
      for (var i = 0; i < this.clonedData.category.length; i++){
        if (this.clonedData.category[i]==$event.source.id){
          index = i;
          break;
        }
      }
      if (index > -1) {
        this.clonedData.category.splice(index, 1);
      }
    }
  }

}
