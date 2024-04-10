import { FoodDetails } from './../foodDetails';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-foodDetails',
  templateUrl: './foodDetails.component.html',
  styleUrls: ['./foodDetails.component.css'],
})
export class FoodDetailsComponent implements OnInit {
  details: FoodDetails | undefined;
  foodName: string = '';
  constructor(
    private diettracker: DiettrackerService,
    private route: ActivatedRoute
  ) {
    // this.sharedData = this.diettracker.getuserid();
    // this.formData.UserId=this.sharedData;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.foodName = params['foodName'];
      console.log(this.foodName);
      this.fooddetails();
    });
  }
  fooddetails(): void {
    //const userId = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    const userId=sessionData.userId;
    if (!userId) {
      console.error('User ID is not set.');
      return;
    }
    if (!this.foodName) {
      console.error('Food name is not set.');
      return;
    }
    this.diettracker.foodDetails(this.foodName, userId).subscribe(
      (data: FoodDetails) => {
        console.log(this.foodName);
        console.log(userId);
        console.log(data);
        this.details = data; // Assign the received data to the details property
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
