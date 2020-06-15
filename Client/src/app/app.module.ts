import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * !===== THIRD PARTY MODULES =====!
 */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './home/category/category.component';
import { ProductComponent } from './home/product/product.component';
import { SearchComponent } from './home/search/search.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { ManageProductsComponent } from './admin/products/manage-products/manage-products.component';
import { EditDialogComponent } from './admin/products/manage-products/edit-dialog/edit-dialog.component';
import { AddCategoryComponent } from './admin/categories/add-category/add-category.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { RemoveCategoryComponent } from './admin/categories/remove-category/remove-category.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    SearchComponent,
    LoginComponent,
    AdminComponent,
    NavbarComponent,
    OverviewComponent,
    ProductsComponent,
    AddProductComponent,
    ManageProductsComponent,
    EditDialogComponent,
    AddCategoryComponent,
    CategoriesComponent,
    RemoveCategoryComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    SnotifyModule,
    NgbModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditDialogComponent
  ]
})
export class AppModule { }
