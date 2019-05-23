import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey';



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public _surveys : Survey [];
  
  constructor(private surveyService: SurveyService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Adolescents', 'Unlicensed', 'First-timers', 'Targetables'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData =  [{data: [], label: 'All Participated'}];

  public pieChartLabels = ['The percentage of targetables that care about drifting',
  'The percentage of targetables that picked FWD or “I don’t know” for drivetrain',
  'The average amount of BMWs owned by targetables'];
  public pieChartType = 'pie';
  public pieChartData = [{data: [], label: 'The Participated divided by different group'}];
  public all_models = [];


  ngOnInit() {
    let adolescents = 0;
    let unlicensed = 0 ;
    let first_timers = 0;
    let targetables = 0;
    let drifting = 0;
    let drivetrain = 0;
    let how_many = 0;
    let how_many_own = 0;


    this.surveyService.getAllSurvey()
      .subscribe(res => {
        this._surveys = res;
        if ( this._surveys != null ) {
          targetables = this._surveys.length;

          this._surveys.forEach(element => {
            if (element.age < 18) {
              adolescents ++;
            }
            if (element.license === 'No, I prefer using other transport') {
              unlicensed ++;
            }
            if (element.age >= 18 && element.age <= 25 && element.first_car === 'Yes') {
              first_timers ++;
            }
            if (element.drivetrain === 'FWD' || element.drivetrain === 'I don’t know') {
              drivetrain ++;
            }
            if (element.drifting === 'Yes') {
              drifting ++;
            }
            if (element.how_many > 0) {
              how_many += element.how_many;
              how_many_own ++;
            }

           element.models.forEach(item => {
            this.all_models.find(item)

            var found = this.all_models.find(function(value, index, array) {
              array.push(999);
              visited.push(value);
              return false;
            });



            this.all_models.push({item : 1});
           });



          });
          this.barChartData = [
            {data: [adolescents, unlicensed, first_timers, targetables], label: 'All Participated'}
          ];
          drivetrain = Math.trunc(drivetrain * 100 / targetables) ;
          drifting = Math.trunc(drifting * 100 / targetables);
          how_many = Math.trunc( how_many / how_many_own);

          this.pieChartData = [
            {data: [drifting, drivetrain, how_many], label: 'The Participated divided by different group'}
          ];
  }
  }, err => {
    console.log(err);
  });



  }

  getSurvey() {
    this.surveyService.getAllSurvey()
      .subscribe( data => {
          this._surveys = data;
      });
  }
}


