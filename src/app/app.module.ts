import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { ChartsModule } from 'ng2-charts';

// import { ChartModule } from '@syncfusion/ej2-angular-charts';
// import { CategoryService,  TooltipService} from '@syncfusion/ej2-angular-charts';
// import { BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService} from '@syncfusion/ej2-angular-charts';

/*************************Components****************************/
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';


import { AppRoutingModule } from './/app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

/*************************Services******************************/
import { SurveyService } from './services/survey.service';



@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    HomeComponent,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
    SurveyService //,
   // CategoryService, 
   // LegendService, 
  ///  TooltipService, 
  //  DataLabelService, 
   // LineSeriesService,
  //  ColumnSeriesService,
  //  BarSeriesService,
  //  MultiLevelLabelService, 
  //  SelectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
