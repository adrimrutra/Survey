import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey';
import { stringify } from 'querystring';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  answers = {
    gender : ['', 'M', 'F', 'Other'],
    license : ['', 'Yes', 'No, I prefer using other transport'],
    yes_no : ['', 'Yes', 'No'],
    drivetrain : ['', 'FWD', 'RWD', 'I don’t know']
  };

  survey: Survey;
  constructor(private surveyService: SurveyService) {
    this.survey = new Survey();
  }

  ngOnInit() {
  }

  getAge(event: any) {
    this.survey.age = event.target.value ;
    if (this.survey.age < 18) {

    }
  }

  getGender(value: any) {
    this.survey.gender = value;
  }

  getLicense(value: any) {
    this.survey.license = value;
  }

  getFirst_car(value: any) {
    this.survey.first_car = value;
  }

  getDrivetrain(value: any) {
    this.survey.drivetrain = value;
  }

  getDrifting(value: any) {
    this.survey.drifting = value;
  }

  getHow_many(event: any) {
    this.survey.how_many = event.target.value ;
    this.survey.models = [];
    for (let index = 0; index < this.survey.how_many ; index++) {
      this.survey.models.push('');
    }
  }

  addSurvey() {
    this.surveyService.addSurvey(this.survey)
    .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

}
