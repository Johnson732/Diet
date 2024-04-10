import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css'],
})
export class AddUserComponent implements OnInit {
  boerror:string='';
  boTimeout:any;
  // @Input() userid:string = '';
  // @Input() email:string = '';
  // @Input() password:string = '';

  // @Input() item:string='';
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
    UserId: '',
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
  constructor(private diettracker: DiettrackerService,private router:Router) {
    this.sharedData = this.diettracker.getuserid();
    this.formData.UserId=this.sharedData;
  }

  ngOnInit() {


  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      const userId = this.diettracker.getuserid();
      if (!userId) {
        console.error('UserId is not set.');
        console.log('Check if the service is initialized:', this.diettracker); // Log the service instance

        return;
      }
      const formData = { ...form.value, UserId: userId };
      console.log('Form Data:', formData);
      this.diettracker.addNewUser(formData).subscribe(
        (response) => {
          console.log('New User details added', response);
          this.router.navigateByUrl('/dashboard');
          form.resetForm();
        },
        (error) => {
          console.error('Error adding new user data:', error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400 && error.error && error.error.errors) {
              // Handle validation errors
              this.boerror = error.error.message;
              console.error('Validation errors:', error.error.errors);
            } else {
              this.boerror = error.error.message;
              // Handle other errors
              console.error('Other error:', error.statusText);
              this.boTimeout = setTimeout(() => {
                this.boerror = ''; // Reset foodsuccess after 5 seconds (adjust as needed)
              }, 3000); // 5000 milliseconds = 5 seconds
              form.resetForm();
              // Handle other errors
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
