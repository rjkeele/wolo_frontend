// @ts-ignore
import { Component, OnInit } from '@angular/core';

import { ReferralApiService } from '../../apiservice/referral.service';

import { Referral } from '../../model/Referral';
declare var $: any;

// @ts-ignore
@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.component.html',
  styleUrls: ['./refferal.component.css']
})
export class RefferalComponent implements OnInit {

  events: Referral[] = []
  updating_event: Referral
  name: string
  email: string
  businessName: string
  address: string
  phone: number
  city: string
  state: string
  zip: number
  comment: string

  isCreate:boolean

  constructor(private apiService:ReferralApiService) {}

  ngOnInit() {
    this.apiService.getReferrals().subscribe(
      (res) => {
        this.events = [];
        for(var x=0;; x++){
          if(res[x] == null) break;
          this.events.push(res[x])
        }
      }, (error) => {
        console.log(error);
      });
  }

  createEvent() {
    this.isCreate = true
    $('#myModal').modal('show');
  }
  updateItem($obj, $index) {
    this.updating_event = $obj
    this.name = this.updating_event.name
    this.email = this.updating_event.email
    this.businessName = this.updating_event.businessName
    this.address = this.updating_event.address
    this.phone = this.updating_event.phone;
    this.city = this.updating_event.city
    this.state = this.updating_event.state
    this.zip = this.updating_event.zip
    this.comment = this.updating_event.comment
    this.isCreate = false
    $('#myModal').modal('show');
  }

  saveEvent(){
    if(this.isCreate){
      var event_tmp = {
        name: this.name,
        email: this.email,
        businessName: this.businessName,
        address: this.address,
        phone: this.phone,
        city: this.city,
        state: this.state,
        zip: this.zip,
        comment: this.comment
      };
      this.apiService.createReferral(event_tmp).subscribe(
        (res) => {
          this.events.push(event_tmp);
        }, (error) => {
          console.log(error);
        });
    }
    else {
      this.updating_event.name = this.name;
      this.updating_event.email = this.email;
      this.updating_event.businessName = this.businessName;
      this.updating_event.address = this.address;
      this.updating_event.phone = this.phone;
      this.updating_event.city = this.city;
      this.updating_event.state = this.state;
      this.updating_event.zip = this.zip;
      this.updating_event.comment = this.comment;
      this.apiService.updateReferral(this.updating_event._id, this.updating_event).subscribe(
        (res) => {
        }, (error) => {
          console.log(error);
        });
    }
    $('#myModal').modal('hide');
  }

  removeItem($pk, $index){
    this.apiService.deleteReferral($pk).subscribe(
      (res) => {
        this.events.splice($index, 1);
      }, (error) => {
        console.log(error);
      });
  }

}
