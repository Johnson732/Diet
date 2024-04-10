import { DiettrackerService } from './../diettracker.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router ,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  loginError: string = '';
  formData: { UserId: string; Email: string; Password: string } = {
    UserId: '',
    Email: '',
    Password: '',
  };
  userid:string=this.formData.UserId;
  email:string=this.formData.Email;
  password:string=this.formData.Password;
  constructor(private diettracker: DiettrackerService,private router:Router) {}


  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      this.diettracker.addNewSignUp(formData).subscribe(
        (response) => {
          console.log('New User Signed Up', response);
          this.diettracker.setcount(1);
          this.router.navigateByUrl('/Login');
          // const navigationExtras: NavigationExtras = {
          //   queryParams: { firstTimeLogin: 1 }
          // };
          // this.router.navigateByUrl('/Login', navigationExtras);
          form.resetForm();
        },
        (error) => {
          console.error('Error login data:', error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400 && error.error && error.error.message) {
              // Store the error message
              this.loginError = error.error.message;
            } else {
              this.loginError = 'An error occurred during login.';
            }
          } else {
            this.loginError = 'An error occurred during login.';
          }
        }
      );
    }
  }
}
