import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DiettrackerService } from '../diettracker.service';
import { Consumed } from './../consumed';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consumed',
  templateUrl: './consumed.component.html',
  styleUrls: ['./consumed.component.css']
})
export class ConsumedComponent {
  caloriesno:Consumed|undefined;
  constructor(
    private diettracker: DiettrackerService,
    private route: ActivatedRoute
  ){}
  ngOnInit(){
    this.caloriesConsumed();
  }
  caloriesConsumed():void{
    const sessionData=this.diettracker.getSession();
    const userId=sessionData.userId;
    if (!userId) {
      console.error('User ID is not set.');
      return;
    }
    this.diettracker.consumed(userId).subscribe(
      (data:Consumed)=>{
        console.log(data);
        this.caloriesno=data;
        console.log(this.caloriesno);
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
