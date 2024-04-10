import { Component, OnInit } from '@angular/core';
import { ViewFood } from '../ViewFood';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deleteFood',
  templateUrl: './deleteFood.component.html',
  styleUrls: ['./deleteFood.component.css'],
})
export class DeleteFoodComponent implements OnInit {
  foods: ViewFood | undefined;

  userid: string = '';
  createdon: Date = new Date();
  constructor(
    private diettracker: DiettrackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.createdon = params['createdon'];
      console.log(this.createdon);
      //this.userid = this.diettracker.getuserid();
      const sessionData = this.diettracker.getSession();
      this.userid = sessionData.userId;
      this.viewfood();
    });
  }
  viewfood(): void {
    //const userId = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    const userId=sessionData.userId;
    if (!userId) {
      console.error('User ID is not set.');
      return;
    }

    this.diettracker.deleteview(userId, this.createdon).subscribe(
      (data: ViewFood) => {
        console.log(data);

        console.log(userId);
        console.log(this.createdon);
        //Assuming the response is an array of objects containing ViewFood data
        this.foods = {
          UserId: data.UserId,
          FoodName: data.FoodName,
          Quantity: data.Quantity,
          MealName: data.Meal?.MealName,
          CreatedOn: data.CreatedOn,
          UnitSize: data.ServingSizeNavigation?.UnitSize,
          ServingSizeNavigation: data.ServingSizeNavigation,
          Meal: data.Meal,
        };
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
}
