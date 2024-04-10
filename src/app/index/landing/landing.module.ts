import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddFoodComponent } from 'src/app/dashboard/addFood/addFood.component';
import { Input } from '@angular/core';

@NgModule({
  declarations: [LandingComponent],
  exports: [LandingComponent, FormsModule],
  imports: [CommonModule, RouterModule],
})
export class LandingModule {}
