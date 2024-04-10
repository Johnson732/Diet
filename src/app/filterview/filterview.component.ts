import { Component, OnInit } from '@angular/core';
import { ViewFood } from '../ViewFood';
import { HttpErrorResponse } from '@angular/common/http';
import { DiettrackerService } from './../diettracker.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filterview',
  templateUrl: './filterview.component.html',
  styleUrls: ['./filterview.component.css']
})
export class FilterviewComponent implements OnInit {
  userid: string = '';
  numberInput:number=0;
  constructor(private diettracker: DiettrackerService) {

  }

  ngOnInit() {
    //this.userid = this.diettracker.getuserid();
    const sessionData=this.diettracker.getSession();
    this.userid=sessionData.userId;
  }
  applyFilter() {
    // Call setno method from service to set the no value
    this.diettracker.setno(this.numberInput);
  }
}
