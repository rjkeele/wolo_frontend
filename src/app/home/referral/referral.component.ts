// @ts-ignore
import { Component, OnInit } from '@angular/core';

import { ReferralApiService } from '../../apiservice/referral.service';

import { Referral } from '../../model/Referral';
declare var $: any;

// @ts-ignore
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {

  events: Referral[] = []
  updating_event: Referral
  name: string = '';
  email: string = '';
  businessName: string = '';
  address: string = '';
  phone: number = null;
  city: string = '';
  state: string = '';
  zip: number = null;
  comment: string = '';

  isCreate:boolean;

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

  saveEvent(){
    if(this.name=='' || this.email=='' || this.businessName=='' || this.address=='' || this.city=='' || this.state=='' || this.zip==null || this.comment==''){
      alert('Please fill all area')
    }
    else{
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
        this.name = '';
        this.email = '';
        this.businessName = '';
        this.address = '';
        this.phone = null;
        this.city = '';
        this.state = '';
        this.zip = null;
        this.comment = '';
        alert("Thank you for submitting Referral, we will contact in case of any questions")
    }
    
  }

}
