import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiettrackerService } from '../diettracker.service';

@Component({
  selector: 'app-delete2',
  templateUrl: './delete2.component.html',
  styleUrls: ['./delete2.component.css']
})
export class Delete2Component implements OnInit {

  userid: string = '';
  createdOn: Date | undefined;

  constructor(private diettrackerService: DiettrackerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("Route Params:", params);
      this.userid = params['userId']; // Note the capitalization here
      this.createdOn = params['createdon']; // Note the lowercase here
      // if (dateStr) {
      //   this.createdOn = new Date(dateStr);
      // }
      console.log("UserID:", this.userid);
      console.log("CreatedOn:", this.createdOn);
      this.deleteFood();
    });
  }


  deleteFood() {
    if (!this.userid || !this.createdOn) {
      console.error('Invalid userid or createdOn');
      return;
    }
    this.diettrackerService.delete(this.userid, this.createdOn).subscribe(
      response => {
        console.log(response);
        // Handle response if needed
      },
      error => {
        console.error(error);
        // Handle errors
      }
    );
  }
}
