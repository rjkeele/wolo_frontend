import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//
// import { FileSelectDirective } from 'ng2-file-upload';
//
import { FormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { front_end_config } from './apiservice/config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: front_end_config.google_map_key,
      libraries: ['geometry', 'places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
