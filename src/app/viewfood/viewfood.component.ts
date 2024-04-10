import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { Input } from '@angular/core';
import { ViewFood } from '../ViewFood';
@Component({
  selector: 'app-viewfood',
  templateUrl: './viewfood.component.html',
  styleUrls: ['./viewfood.component.css']
})
export class ViewfoodComponent implements OnInit {
  foods: ViewFood[] = [];
  userid: string='';
  constructor(private diettracker: DiettrackerService) {
    // this.sharedData = this.diettracker.getuserid();
    // this.formData.UserId=this.sharedData;
  }
  ngOnInit() {
    this.viewfood();
    //this.userid = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    this.userid=sessionData.userId;
  }
  viewfood():void{
    //const userId = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    const userId=sessionData.userId;
    if (!userId) {
      console.error('User ID is not set.');
      return;
    }

    this.diettracker.viewFood(userId).subscribe(
      (data: any) => {
        console.log(data);

        //Assuming the response is an array of objects containing ViewFood data
        this.foods = data.map((item: any) => ({
          FoodName: item.FoodName,
          Quantity: item.Quantity,
          MealName: item.Meal?.MealName,
          CreatedOn: item.CreatedOn,
          UnitSize: item.ServingSizeNavigation?.UnitSize
        }));

      },(error) => {
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
}
