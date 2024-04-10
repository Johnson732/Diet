import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddUserComponent } from './addUser/addUser.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddFoodComponent } from './dashboard/addFood/addFood.component';
import { ViewfoodComponent } from './viewfood/viewfood.component';
import { FoodDetailsComponent } from './foodDetails/foodDetails.component';
import { DeleteFoodComponent } from './deleteFood/deleteFood.component';
import { Delete2Component } from './delete2/delete2.component';
import { FilterviewComponent } from './filterview/filterview.component';
import { FilterComponent } from './filter/filter.component';
import { UpdateUserComponent } from './updateUser/updateUser.component';
import { authGuard } from './auth.guard';
const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate:[authGuard],
  },

  { path: 'SignUp', component: SignUpComponent },
  { path: 'Login', component: LoginComponent },
  //{ path: 'AddUser', component: AddUserComponent },
  //{ path: 'AddFood', component: AddFoodComponent },
//  { path: 'ViewFood', component: ViewfoodComponent },
  //{ path: 'FoodDetails/:foodName/:userId', component: FoodDetailsComponent },
//  { path: 'DeleteFood/:userId/:createdon', component: DeleteFoodComponent },
  //{ path: 'Delete2/:userId/:createdon', component: Delete2Component },
//  { path: 'Filterview', component: FilterviewComponent },
 // { path: 'Filter/:userid', component: FilterComponent },
  //{ path: 'Update', component: UpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
