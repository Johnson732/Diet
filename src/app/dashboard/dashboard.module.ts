import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddFoodComponent } from './addFood/addFood.component';
import { UpdateUserComponent } from '../updateUser/updateUser.component';
import { ViewfoodComponent } from '../viewfood/viewfood.component';
import { FoodDetailsComponent } from '../foodDetails/foodDetails.component';
import { DeleteFoodComponent } from '../deleteFood/deleteFood.component';
import { Delete2Component } from '../delete2/delete2.component';
import { FilterviewComponent } from '../filterview/filterview.component';
import { FilterComponent } from '../filter/filter.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    /////////
    // UpdateUserComponent,
    AddFoodComponent,
    //   ViewfoodComponent,
    //    FoodDetailsComponent,
    //    DeleteFoodComponent,
    //   Delete2Component,
    //   FilterviewComponent,
    //    FilterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    
    //BrowserModule,
    HttpClientModule,
    //AppRoutingModule,
    //RouterModule,
    FormsModule,
  ],
})
export class DashboardModule {}
