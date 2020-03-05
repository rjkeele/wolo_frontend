// @ts-ignore
import {NgModule, NgZone} from '@angular/core';
// @ts-ignore
import {Routes, RouterModule, Router} from '@angular/router';

import {AdminComponent} from './admin.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ServiceComponent} from './service/service.component';
import {LocationComponent} from './location/location.component';
import {EventsComponent} from './events/events.component';
import {RefferalComponent} from './refferal/refferal.component';
import {MapsComponent} from './maps/maps.component';
import {UesrComponent} from './uesr/uesr.component';
import {PracticeComponent} from "./practice/practice.component";
import {AdminLoginComponent} from "./login/login.component";

// let routes: Routes;
// var loginFlag = localStorage.getItem("loginFlag");
// if (!loginFlag || loginFlag == 'false') {
  // this.NgZone.run(() => this.Router.navigateByUrl('/home/login'));
//   routes = [
//     {
//       path: '',
//       redirectTo: '/home/login',
//     }
//   ];
// }
const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {path: 'explore', component: ServiceComponent},
        {path: 'location', component: LocationComponent},
        {path: 'participate', component: EventsComponent},
        {path: 'recommend', component: RefferalComponent},
        {path: 'maps', component: MapsComponent},
        {path: 'user', component: UesrComponent},
        {path: 'practice', component: PracticeComponent},
        {path: 'login', component: AdminLoginComponent},
        {
          path: '',
          redirectTo: 'maps',
          pathMatch: 'full',
        }
      ]
    },

  ];

// }


// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
