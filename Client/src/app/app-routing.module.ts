import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';

// Gaurds
import { AuthGuard } from 'src/shared/gaurds/auth.guard';
import { NavigationGuard } from 'src/shared/gaurds/navigation.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
