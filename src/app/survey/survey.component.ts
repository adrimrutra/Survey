import { Component, OnInit }  from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers:  [SurveyService]
})
export class SurveyComponent implements OnInit {
  constructor(private surveyService: SurveyService, private fb: FormBuilder) {}

  ngOnInit() {}
 
  public answers = {
    gender :  [{'id':1, 'choice':''},{'id':2, 'choice':'M'}, {'id':3, 'choice': 'F'}, {'id':4, 'choice': 'Other'}],
    license :  [{'id':1,'choice':''},{'id':2, 'choice':'Yes'},{'id':3, 'choice':'No, I prefer using other transport'}],
    yes_no :  [{'choice':''},{'choice':'Yes'},{'choice':'No'}],
    drivetrain : [{'choice':''},{'choice':'FWD'},{'choice':'RWD'},{'choice':'I don’t know'}]
  };
  public carPatern = '(^[M]\d{3}[d|i])$|(^[X|Z]\d{1}$)';

  public surveyForm = this.fb.group({
    age: Number,
    gender: String,
    country: String,
    license: String, 
    first_car: String, 
    drivetrain: String,
    drifting: String,
    how_many: Number,
    carmodels: this.fb.array([])
  });

  public young_driver = false;
  public q_three = false;
  public q_five = false;
  public five = 5;
  public six = 6;
  public seven = 7;
  public eight = 8;
 
  checkAgeGender() {
    let age = (this.surveyForm.get('age') as FormArray).value;
    let gender = (this.surveyForm.get('gender') as FormArray).value;
    if (gender === 'M' || gender === 'F') {
      if (age < 18 ) {
          this.addSurvey();
      } else if (age >= 18) {
          this.q_three = true;
      }
    }
  }

  isLicense() {
    let license = (this.surveyForm.get('license') as FormArray).value;
    let age = (this.surveyForm.get('age') as FormArray).value;
    if (license === 'Yes') {
      if (age >= 18 && age < 25) {
        this.young_driver = true;
      } else if (age >= 25) {
        this.q_five = true;
        this.five = 4;
        this.six = 5;
        this.seven = 6;
        this.eight = 7;
      }
    } else if (license === 'No, I prefer using other transport') {
      this.addSurvey();
    }
  }

  isFirstCar() {
    let first_car = (this.surveyForm.get('first_car') as FormArray).value;
    if (first_car === 'No') {
       this.q_five = true;
    } else if (first_car === 'Yes') {
       this.addSurvey();
    }
  }

  get carmodels() {
    return this.surveyForm.get('carmodels') as FormArray;
  }

  isDriven() {
    let count = (this.surveyForm.get('how_many') as FormArray).value;

    for (let index = 0; index < this.carmodels.controls.length; index++) {
      this.carmodels.removeAt(index);
    }

    for (let index = 0; index < count; index++) {
      this.carmodels.push(this.fb.control('', [Validators.required, Validators.pattern(this.carPatern)]));
    }
  }
  reset(){
    this.young_driver = false;
    this.q_three = false;
    this.q_five = false;
    this.five = 5;
    this.six = 6;
    this.seven = 7;
    this.eight = 8;
  }

  addSurvey() {
    this.surveyService.addSurvey(this.surveyForm.value)
    .subscribe(res => {
        alert('Thank you !');
        this.surveyForm.reset();
        this.reset();
      }, (err) => {
        console.log(err);
      });
  }

}
