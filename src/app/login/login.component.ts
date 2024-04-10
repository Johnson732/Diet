import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  //session:any;
  formData: { UserId: string; Password: string } = {
    UserId: '',
    Password: '',
  };
  // userid:string=this.formData.UserId;
  // password:string=this.formData.Password;
  constructor(
    private diettracker: DiettrackerService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Form Data:', formData);
      this.diettracker.setuserid(formData.Userid);
      console.log('UserID:', this.diettracker.getuserid);
      this.diettracker.userLogin(formData).subscribe(
        (response) => {
          //////
          //this.diettracker.setSession(response);
          this.diettracker.setSession({
            userData: response,
            userId: formData.Userid, // Pass the user ID here
            //message: 'added'
          });
          localStorage.setItem('session',JSON.stringify(this.diettracker.getSession()));

          /////
          console.log('User logged in', response);

          if (this.diettracker.getcount() == 1) {
            this.router.navigateByUrl('/AddUser');
          } else {
            this.router.navigateByUrl('/dashboard');
          }
          //form.resetForm();
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
