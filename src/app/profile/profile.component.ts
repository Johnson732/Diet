import { Component } from '@angular/core';
import { DiettrackerService } from '../diettracker.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { FetchUser } from '../fetchUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profile: FetchUser |undefined;
  // UserId: string='';
  // FirstName: string='';
  // LastName: string='';
  // Dob: Date=new Date();
  // UserGender: number=0;
  // Height: number=0;
  // Weight: number=0;
  // ExerciseLevel: number=0;
  // UserGoal: number=0;
  constructor(private diettracker: DiettrackerService) {}
  ngOnInit() {
    this.userprofile();
  }

  userprofile():void{
    //const userId = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    const userId=sessionData.userId;
  if(userId){
    this.diettracker.fetchUser2(userId).subscribe(
      (data:FetchUser)=>{
        this.profile = data;
      },(error) => {
        console.error('Error fetching user data:', error);
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
  } else {
    console.error('UserId is not set.');
  }
  }
}
