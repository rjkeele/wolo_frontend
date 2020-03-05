// @ts-ignore
import { Component, OnInit } from '@angular/core';

import { EventApiService } from '../../apiservice/events.service';

import { event } from '../../model/Event';
declare var $: any;

// @ts-ignore
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: event[] = []
  updating_event: event
  name: string
  email: string
  contact: string

  constructor(private apiService:EventApiService) {}

  ngOnInit() {
    this.apiService.getEvents().subscribe(
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

  signupEvent($obj) {
    this.updating_event = $obj
    $('#myModal').modal('show');
  }

  save_signup_Event() {
    var tmp = {
      name: this.name,
      email: this.email,
      contact: this.contact
    }
    // if(this.email == null || this.contact == null){
    //   this.updating_event.interested.push(tmp);
    // }
    // else {
    //   this.updating_event.registered.push(tmp);
    // }
    // this.apiService.updateEvent(this.updating_event._id, this.updating_event).subscribe(
    //   (res) => {
    //   }, (error) => {
    //     console.log(error);
    //   });
    this.apiService.registerToEvent(this.updating_event._id, tmp).subscribe(
      (res) => {
      }, (error) => {
        console.log(error);
      });

    this.name = ''
    this.email = ''
    this.contact = ''

    $('#myModal').modal('hide');

    alert('Your requirement is registered')
  }

}
