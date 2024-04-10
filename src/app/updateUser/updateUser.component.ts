import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
// Assuming UserService is the service to fetch and update user data

@Component({
  selector: 'app-updateUser',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.css'],
})
export class UpdateUserComponent implements OnInit {
  UserId1: string = '';
  FirstName1: string = '';
  LastName1: string = '';
  Dob1: string = '';
  UserGender1: string = '';
  Height1: number = 0;
  Weight1: number = 0;
  ExerciseLevel1: string = '';
  UserGoal1: string = '';
  formData: {
    UserId: string;
    FirstName: string;
    LastName: string;
    Dob: Date;
    UserGender: number;
    Height: number;
    Weight: number;
    ExerciseLevel: number;
    UserGoal: number;
  } = {
    UserId: this.diettracker.getuserid(),
    FirstName: '',
    LastName: '',
    Dob: new Date(),
    UserGender: 0,
    Height: 0,
    Weight: 0,
    UserGoal: 0,
    ExerciseLevel: 0,
  };
  sharedData: any;
  constructor(private diettracker: DiettrackerService) {}

  ngOnInit() {
    // Fetch user data when component initializes
    //const userId = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    const userId=sessionData.userId;
    console.log("sess"+userId);
    if (userId) {
      this.diettracker.fetchUser2(userId).subscribe(
        (user) => {
          // Assign fetched user data to dummy variables for displaying
          this.UserId1 = user.UserId;
          this.FirstName1 = user.Firstname;
          this.LastName1 = user.Lastname;
          this.Dob1 = user.Dob; // Convert date to string
          this.UserGender1 = user.UserGenderNavigation?.GenderValue || '';
          this.Height1 = user.Height;
          this.Weight1 = user.Weight;
          this.UserGoal1 = user.UserGoalNavigation?.GoalValue || ''; // Convert number to string
          this.ExerciseLevel1 = user.ExerciseLevelNavigation?.Exercise || '';
          console.log(this.UserGender1);
          console.log(this.UserGoal1);
          console.log(this.ExerciseLevel1);
        },

        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('UserId is not set.');
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = { ...form.value, UserId: this.formData.UserId };
      console.log('Form Data:', formData);
      this.diettracker.updateUser(formData).subscribe(
        (response) => {
          console.log('User details updated', response);
          form.resetForm();
        },
        (error) => {
          console.error('Error updating user data:', error);
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
}
