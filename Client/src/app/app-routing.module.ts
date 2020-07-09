import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { OverviewComponent } from './admin/overview/overview.component';

// ------PRODUCTS--------//
import { ProductsComponent } from './admin/products/products.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { ManageProductsComponent } from './admin/products/manage-products/manage-products.component';

// Gaurds
import { AuthGuard } from 'src/shared/gaurds/auth.guard';
import { NavigationGuard } from 'src/shared/gaurds/navigation.guard';

// ------CATEGORIES--------//
import { CategoriesComponent } from './admin/categories/categories.component';
import { AddCategoryComponent } from './admin/categories/add-category/add-category.component';
import { RemoveCategoryComponent } from './admin/categories/remove-category/remove-category.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { ProductListingComponent } from './home/product-listing/product-listing.component';
import { CompanyComponent } from './admin/company/company.component';
import { AddCompanyComponent } from './admin/company/add-company/add-company.component';
import { RemoveCompanyComponent } from './admin/company/remove-company/remove-company.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/products', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'products', component: ProductListingComponent }, 
    { path: 'contactus', component: ContactUsComponent }
  ] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', component: OverviewComponent },

    // Products
    { path: 'product', component: ProductsComponent, children: [
      { path: 'add', component: AddProductComponent },
      { path: 'manage', component: ManageProductsComponent }
    ] },

    // Categories
    { path: 'categories', component: CategoriesComponent, children: [
      { path: 'add', component: AddCategoryComponent },
      { path: 'remove', component: RemoveCategoryComponent }
    ] },

    { path: 'company', component: CompanyComponent, children: [
      { path: 'add', component: AddCompanyComponent },
      { path: 'remove', component: RemoveCompanyComponent }
    ] },

    { path: 'change-password', component: ChangePasswordComponent }


  ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
