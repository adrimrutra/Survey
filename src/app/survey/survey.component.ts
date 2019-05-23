import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey';


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

  public survey: Survey;
  public young_driver = false;
  public q_tree = false;
  public q_five = false;
  public five = 5;
  public six = 6;
  public seven = 7;
  public eight = 8;

  constructor(private surveyService: SurveyService) {
    this.survey = new Survey();
  }

  ngOnInit() {
  }

  getAge(event: any) {
    this.survey.age = event.target.value ;

    if (this.survey.gender === 'M' || this.survey.gender === 'F') {
      if (this.survey.age < 18 ) {
          this.addSurvey();
      } else if (this.survey.age >= 18) {
          this.q_tree = true;
      }

    }
  }

  getGender(value: any) {
    this.survey.gender = value;
    if (this.survey.gender === 'M' || this.survey.gender === 'F') {
      if (this.survey.age < 18 ) {
          this.addSurvey();
      } else if (this.survey.age >= 18) {
          this.q_tree = true;
      }
    }
  }

  getLicense(value: any) {
    this.survey.license = value;
    if (this.survey.license === 'Yes') {
      if (this.survey.age >= 18 && this.survey.age < 25) {
        this.young_driver = true;
      } else if (this.survey.age >= 18) {
        this.q_five = true;
        this.five = 4;
        this.six = 5;
        this.seven = 6;
        this.eight = 7;
      }
    } else if (this.survey.license === 'No, I prefer using other transport') {
      this.addSurvey();
      this.young_driver = false;
    }
  }

  getFirst_car(value: any) {
    this.survey.first_car = value;
    if (this.survey.first_car === 'No') {
       this.q_five = true;
    } else if (this.survey.first_car === 'Yes') {
       this.addSurvey();
    }
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
      alert('Thank you !');
      this.survey = new Survey();
        this.young_driver = false;
        this.q_tree = false;
        this.q_five = false;
        this.five = 5;
        this.six = 6;
        this.seven = 7;
        this.eight = 8;
      }, (err) => {
        console.log(err);
      });
  }

}
