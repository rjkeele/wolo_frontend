import { Component, OnInit } from '@angular/core';

import { LocationApiService } from '../../apiservice/mapapi.service';

import { marker } from '../../model/Marker';
import {practice} from "../../model/Practice";
import {PracticeApiService} from "../../apiservice/practice.service";
import {error} from "util";

declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  markers: marker[] = [];
  location: marker;
  locationName: string;
  row_index: number;
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  newComment: string;
  isCreate:boolean;
  practiceList:[];

  practices: practice[] = [];
  updating_practices: practice;
  description: string;
  addOrUpdate: string;

  constructor(
    private apiService:LocationApiService,
    private practiceService:PracticeApiService
  ) {}

  ngOnInit() {
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

    this.practiceService.getPractices().subscribe(
      (res) => {
        this.practices = [];
        for (var x=0;;x++) {
          if(res[x] == null) break;
          this.practices.push(res[x]);
        }
      }, (error) => {
        console.log(error);
      }
    );
  }
//
  createLocation() {
    this.locationName = '';
    this.address = '';
    this.zip = '';
    this.lat = null;
    this.lng = null;
    this.city = '';
    this.state = '';
    this.isCreate = true;
    this.practiceList = [];
    this.addOrUpdate = 'add';
    $('#myModal').modal('show');
  }

  removeLocation($id, $row_num) {
    this.apiService.deleteLocation($id).subscribe(
      (res) => {
        // this.users = res
        this.markers.splice($row_num, 1);
        //this.ngZone.run(() => this.router.navigateByUrl('/admin'))
      }, (error) => {
        console.log(error);
      });
  }

  updateLocation($location, $row_num) {
    this.row_index = $row_num;
    this.location = $location;
    this.locationName = this.location.locationName;
    this.address = this.location.address;
    this.zip = this.location.zip;
    this.lat = this.location.lat;
    this.lng = this.location.lng;
    this.city = this.location.city;
    this.state = this.location.state;
    this.addOrUpdate = 'update';
    $("#myModal").modal('show');
  }

  saveLocationName() {
    if (this.isCreate) {
      if (this.locationName == '' || this.address == '' || this.zip == '' || this.lat == null
        || this.lng == null || this.city == '' || this.state == ''){
        alert('Please fill all fields.');
        return
      }

      var location_tmp = {
        locationName: this.locationName,
        address: this.address,
        zip: this.zip,
        lat: this.lat,
        lng: this.lng,
        city: this.city,
        state: this.state,
        draggable: true,
        practices: []
      };
      this.apiService.createLocation(location_tmp).subscribe(
        (res) => {
          this.markers.push(location_tmp);

          window.location.reload();

        }, (error) => {
          console.log(error);
        });
    }
    else {
      this.location.locationName = this.locationName;
      this.location.address = this.address;
      this.location.zip = this.zip;
      this.location.lat = this.lat;
      this.location.lng = this.lng;
      this.location.city = this.city;
      this.location.state = this.state;
      this.location.practices = this.practiceList;
      this.apiService.updateLocation(this.location._id, this.location).subscribe(
        (res) => {

          window.location.reload();

        }, (error) => {
          console.log(error);
        });
    }
    $("#myModal").modal('hide');
  }

  appendPractice($location, $row_num) {
    this.row_index = $row_num;
    this.location = $location;
    this.description = '';
    $("#myModal2").modal('show');
  }

  saveNewPractice() {
    var addPractices = [];
    var checkedPractices = $('input:checked');
    var length = checkedPractices.length;
    for (var i=0;i<length;i++){
      addPractices.push($(checkedPractices[i]).val());
    }

    this.location.practices = addPractices;
    this.apiService.updateLocation(this.location._id, this.location).subscribe(
      (res) => {
        window.location.reload();
      }, (error) => {
        console.log(error);
      });
    $("#myModal2").modal('hide');
  }

}
