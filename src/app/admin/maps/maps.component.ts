// @ts-ignore
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

// @ts-ignore
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {Router} from '@angular/router';

// import { LocationApiService } from '../../apiservice/mapapi.service';
//
// import { marker } from '../../model/Marker';

declare var $: any;

// @ts-ignore
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  zoom: number = 4;
  geocoder:any;
  // initial center position for the map
  latitude: number;
  longitude: number;

  // markers: marker[] = [];

  isCreate: boolean;
  newLabel:string;
  // updatingMaker: marker;
  newPractice:string;
  address: string;

  private geoCoder;

  // @ts-ignore
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    // private apiService:LocationApiService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {

    var loginFlag = localStorage.getItem("loginFlag");
    if (!loginFlag || loginFlag == 'false') {
      this.ngZone.run(() => this.router.navigateByUrl('/home/login'));
    }

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          // @ts-ignore
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);

          // alert(this.latitude);
          this.zoom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
