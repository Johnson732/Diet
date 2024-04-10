import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from '../../diettracker.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-addFood',
  templateUrl: './addFood.component.html',
  styleUrls: ['./addFood.component.css'],
})
export class AddFoodComponent implements OnInit {
  foodError: string = '';
  foodsuccess: string = '';
  formData: {
    UserId: string;
    MealId: number;
    FoodName: string;
    ServingSize: number;
    Quantity: number;
  } = {
    UserId: '',
    MealId: 0,
    FoodName: '',
    ServingSize: 0,
    Quantity: 1,
  };
  foodSuccessTimeout: any;
  foodfailTimeout: any;
  sharedData: any;
  constructor(private diettracker: DiettrackerService) {
    //this.sharedData = this.diettracker.getuserid();
    const sessionData = this.diettracker.getSession();
    this.sharedData = sessionData.userId;
    this.formData.UserId = this.sharedData;
  }
  ngOnInit() {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      //const userId = this.diettracker.getuserid();
      const sessionData = this.diettracker.getSession();
      const userId = sessionData.userId;
      if (!userId) {
        console.error('UserId is not set.');
        console.log('Check if the service is initialized:', this.diettracker); // Log the service instance

        return;
      }
      const formData = { ...form.value, UserId: userId };
      console.log('Form Data:', formData);
      this.diettracker.addFood(formData).subscribe(
        (response: any) => {
          console.log('food details added', response);
          this.foodsuccess = response.message;
          this.foodSuccessTimeout = setTimeout(() => {
            this.foodsuccess = ''; // Reset foodsuccess after 5 seconds (adjust as needed)
          }, 3000); // 5000 milliseconds = 5 seconds
          form.resetForm();
          //form.resetForm();
        },
        (error) => {
          console.error('Error adding food data:', error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400 && error.error && error.error.errors) {
              // Handle validation errors
              this.foodError = error.error.message;
              console.error('Validation errors:', error.error.errors);
            } else {
              this.foodError = error.error.message;
              // Handle other errors
              console.error('Other error:', error.statusText);
              this.foodfailTimeout = setTimeout(() => {
                this.foodError = ''; // Reset foodsuccess after 5 seconds (adjust as needed)
              }, 3000); // 5000 milliseconds = 5 seconds
              form.resetForm();
            }
          } else {
            this.foodError = 'An error occurred during adding food.';
            // Handle non-HTTP errors
            console.error('Non-HTTP error:', error);
          }
        }
      );
    }
  }
}
