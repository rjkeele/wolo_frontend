import { Component, OnInit } from '@angular/core';

import { LocationApiService } from '../../apiservice/mapapi.service';

import { marker } from '../../model/Marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  zoom: number = 10;
  geocoder:any;
  // initial center position for the map
  lat: number = 32;
  lng: number = -117;

  markers: marker[] = []

  isCreate: boolean;
  newLabel:string;
  updatingMaker: marker;

  constructor(private apiService:LocationApiService) {}

  ngOnInit(){
    this.apiService.getLocations().subscribe(
      (res) => {
        this.markers = [];
        for(var x=0;; x++){
          if(res[x] == null) break;
          this.markers.push(res[x])
        }
      }, (error) => {
        console.log(error);
      });
  }

}
