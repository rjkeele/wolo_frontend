// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { front_end_config } from '../apiservice/config';

import { UserApiService } from '../apiservice/userapi.service';
import { LocationApiService } from '../apiservice/mapapi.service';
import { EventApiService } from '../apiservice/events.service';
import { ReferralApiService } from '../apiservice/referral.service';

import { HomeRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AgGridModule } from 'ag-grid-angular';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceComponent } from './service/service.component';
import { LocationComponent } from './location/location.component';
import { EventsComponent } from './events/events.component';
import { RefferalComponent } from './refferal/refferal.component';
import { MapsComponent } from './maps/maps.component';
import { UesrComponent } from './uesr/uesr.component';
import { PracticeComponent } from './practice/practice.component';
import { AdminLoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AdminComponent,
    // FileSelectDirective,
    DashboardComponent,
    ServiceComponent,
    LocationComponent,
    EventsComponent,
    RefferalComponent,
    MapsComponent,
    UesrComponent,
    PracticeComponent,
    AdminLoginComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    FileUploadModule,
    AgGridModule.withComponents([]),
    HomeRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: front_end_config.google_map_key,
      libraries: ['geometry', 'places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    UserApiService,
    LocationApiService,
    EventApiService,
    ReferralApiService
  ]
})
export class AdminModule { }
