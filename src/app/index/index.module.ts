import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { LandingModule } from './landing/landing.module';
import { AddFoodComponent } from '../dashboard/addFood/addFood.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, IndexRoutingModule, LandingModule],
})
export class IndexModule {}
