import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { front_end_config } from '../apiservice/config';

import { UserApiService } from '../apiservice/userapi.service';
import { LocationApiService } from '../apiservice/mapapi.service';
import { EventApiService } from '../apiservice/events.service';
import { ReferralApiService } from '../apiservice/referral.service';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { ReferralComponent } from './referral/referral.component';
import { EventComponent } from './event/event.component';
import { ServiceComponent } from './service/service.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    HomepageComponent,
    ReviewsComponent,
    FeedbackComponent,
    SuggestionComponent,
    ContactusComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    ReferralComponent,
    EventComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
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
export class HomeModule { }
