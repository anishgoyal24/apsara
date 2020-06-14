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


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', component: OverviewComponent },

    // Products
    { path: 'product', component: ProductsComponent, children: [
      { path: 'add', component: AddProductComponent },
      { path: 'manage', component: ManageProductsComponent }
    ] }


  ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
