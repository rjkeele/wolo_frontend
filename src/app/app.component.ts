import { Component } from '@angular/core';

import { front_end_config } from './apiservice/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'WOLO';
  map_key:string = front_end_config.google_map_key;
}
