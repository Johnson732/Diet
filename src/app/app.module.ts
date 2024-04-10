import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { DiettrackerService } from './diettracker.service';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './addUser/addUser.component';
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './updateUser/updateUser.component';
import { AddFoodComponent } from './dashboard/addFood/addFood.component';
import { ViewfoodComponent } from './viewfood/viewfood.component';
import { FoodDetailsComponent } from './foodDetails/foodDetails.component';
import { DeleteFoodComponent } from './deleteFood/deleteFood.component';
import { Delete2Component } from './delete2/delete2.component';
import { FilterviewComponent } from './filterview/filterview.component';
import { FilterComponent } from './filter/filter.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ConsumedComponent } from './consumed/consumed.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    AddUserComponent,
    LoginComponent,
    UpdateUserComponent,
    //AddFoodComponent,
    ViewfoodComponent,
    FoodDetailsComponent,
    DeleteFoodComponent,
    Delete2Component,
    FilterviewComponent,
    FilterComponent,
    ProfileComponent,
    ConsumedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
  ],
  providers: [DiettrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
