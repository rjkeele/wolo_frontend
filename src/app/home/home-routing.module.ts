import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: HomepageComponent},
      { path: 'about', component: AboutusComponent },
      { path: 'review', component: ReviewsComponent},
      { path: 'feedback', component: FeedbackComponent },
      { path: 'suggestion', component: SuggestionComponent},
      { path: 'contactus', component: ContactusComponent },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'map', component: MapComponent },
      { path: 'recommend', component: ReferralComponent },
      { path: 'participate', component: EventComponent },
      { path: 'explore', component: ServiceComponent },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },
  
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
