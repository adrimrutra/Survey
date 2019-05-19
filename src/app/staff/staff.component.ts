import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public _surveys : Survey[];
  constructor(private surveyService: SurveyService) { 
    
  }

  ngOnInit() {
   
  }

  getSurvey() {
      this.surveyService.getAllSurvey()
      .subscribe(res => {
        this._surveys = res;
        console.log(this._surveys);
      }, err => {
        console.log(err);
      });
  }
    
}


