import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddFoodComponent } from './addFood/addFood.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: 'AddFood', component: AddFoodComponent },
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   children: [{ path: 'AddFood', component: AddFoodComponent }],
  // },

  // {
  //   path: '',
  //   component: DashboardComponent,
  //   children: [{ path: 'AddFood', component: AddFoodComponent }],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
