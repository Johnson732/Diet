import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { Input } from '@angular/core';
import { ViewFood } from '../ViewFood';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  foods: ViewFood[] = [];
  userid: string = '';
  no: number = 0;
  constructor(
    private diettracker: DiettrackerService,
    private route: ActivatedRoute
  ) {
    this.no = this.diettracker.getno();
  }

  ngOnInit() {
    this.viewfood();
    //this.userid = this.diettracker.getuserid();
    const sessionData = this.diettracker.getSession();
    this.userid = sessionData.userId;

    // Subscribe to changes in query parameters
  }
  viewfood(): void {
    //const userId = this.diettracker.getuserid();
    const sessionData = this.diettracker.getSession();
    const userId = sessionData.userId;
    if (!userId) {
      console.error('User ID is not set.');
      return;
    }
    console.log('number------' + this.no);
    this.diettracker.filter(userId, this.no).subscribe(
      (data: any) => {
        console.log(data);
        console.log('in filter');
        const uniqueFoods = this.removeDuplicates(data);

        //Assuming the response is an array of objects containing ViewFood data
        this.foods = uniqueFoods.map((item: any) => ({
          FoodName: item.foodName, // Accessing directly from 'item'
          Quantity: item.quantity, // Accessing directly from 'item'
          MealName: item.meal?.mealName, // Accessing nested property using optional chaining
          CreatedOn: item.createdOn, // Accessing directly from 'item'
          UnitSize: item.servingSizeNavigation?.unitSize,
          Meal: item.meal, // Add this line
          UserId: item.userId, // Accessing nested property using optional chaining
        }));
        console.log(this.foods);
        console.log('number' + this.no);
      },
      (error) => {
        console.error('Error adding food data:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400 && error.error && error.error.errors) {
            // Handle validation errors
            console.error('Validation errors:', error.error.errors);
          } else {
            // Handle other errors
            console.error('Other error:', error.statusText);
          }
        } else {
          // Handle non-HTTP errors
          console.error('Non-HTTP error:', error);
        }
      }
    );
  }
  removeDuplicates(data: any[]): any[] {
    const uniqueFoods = [];
    const seen = new Set();

    for (const item of data) {
      const foodName = item.foodName;
      if (!seen.has(foodName)) {
        seen.add(foodName);
        uniqueFoods.push(item);
      }
    }

    return uniqueFoods;
  }
}
