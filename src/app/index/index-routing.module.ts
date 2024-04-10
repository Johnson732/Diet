import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { LandingComponent } from './landing/landing.component';
import { AddFoodComponent } from '../dashboard/addFood/addFood.component';
import { AppComponent } from '../app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddUserComponent } from '../addUser/addUser.component';
import { Delete2Component } from '../delete2/delete2.component';
import { DeleteFoodComponent } from '../deleteFood/deleteFood.component';
import { FilterComponent } from '../filter/filter.component';
import { FilterviewComponent } from '../filterview/filterview.component';
import { FoodDetailsComponent } from '../foodDetails/foodDetails.component';
import { UpdateUserComponent } from '../updateUser/updateUser.component';
import { ViewfoodComponent } from '../viewfood/viewfood.component';
import { ProfileComponent } from '../profile/profile.component';
import { authGuard } from '../auth.guard';
import { ConsumedComponent } from '../consumed/consumed.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [{ path: '', component: LandingComponent }],
  },
  //{path:'AddFood',component:AddFoodComponent},
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'AddFood', component: AddFoodComponent ,canActivate:[authGuard],},
      { path: 'AddUser', component: AddUserComponent ,canActivate:[authGuard],},
      { path: 'ViewFood', component: ViewfoodComponent ,canActivate:[authGuard],},
      { path: 'Update', component: UpdateUserComponent,canActivate:[authGuard], },
      { path: 'FoodDetails/:foodName/:userId', component: FoodDetailsComponent,canActivate:[authGuard], },
      { path: 'DeleteFood/:userId/:createdon', component: DeleteFoodComponent ,canActivate:[authGuard],},
      { path: 'Delete2/:userId/:createdon', component: Delete2Component ,canActivate:[authGuard],},
      { path: 'Filterview', component: FilterviewComponent ,canActivate:[authGuard],},
      { path: 'Filter/:userid', component: FilterComponent ,canActivate:[authGuard],},
      { path: 'Profile', component: ProfileComponent ,canActivate:[authGuard],},
      { path: 'Consumed', component: ConsumedComponent ,canActivate:[authGuard],},




    ],
  },
  // {
  //   path:'AddFood',
  //   component:AppComponent,
  //   children:[{path:'AddFood',component:AddFoodComponent}]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
