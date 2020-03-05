// @ts-ignore
import { Component, OnInit } from '@angular/core';

import { LocationApiService } from '../../apiservice/mapapi.service';
import { ServiceApiService } from '../../apiservice/service.service';

import { service } from '../../model/Service';
import { marker } from '../../model/Marker';

declare  var $:  any;

// @ts-ignore
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  zoom: number = 5;
  geocoder:any;
  // initial center position for the map
  lat: number = 40;
  lng: number = -100;
  markers: marker[] = [];
  services: service[] = [];

  constructor(private apiService:LocationApiService, private apiService2:ServiceApiService) {}

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

    this.apiService2.getServices().subscribe(
      (res) => {
        this.services = [];
        for(var x=0;; x++){
          if(res[x] == null) break;
          this.services.push(res[x])
        }
      }, (error) => {
        console.log(error);
      });

    var $slide = $('.slide'),
      $slideGroup = $('.slide-group');
  
    var slidesTotal = ($slide.length - 1),
      current = 0,
      isAutoSliding = true;
  
    var updateIndex = function(currentSlide) {
      if(isAutoSliding) {
        if(current === slidesTotal) {
          current = 0;
        } else {
          current++;
        }
      } else {
          current = currentSlide;
      }
  
      transition(current);
    };
  
    var transition = function(slidePosition) {
      $slideGroup.animate({
        'top': '-' + slidePosition + '00%'
      });
    };
  
    var autoSlide = window.setInterval(updateIndex, 2000);
  }

}
