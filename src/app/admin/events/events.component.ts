// @ts-ignore
import {Component, OnInit} from '@angular/core';

import {FileUploader, FileSelectDirective} from 'ng2-file-upload';

import {EventApiService} from '../../apiservice/events.service';

import {event} from '../../model/Event';

declare var $: any;

const URL = 'http://localhost:9000/api/upload';

// @ts-ignore
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: event[] = [];
  updating_event: event
  title: string
  description: string
  location: string
  date: string
  time: string
  img: string
  currentImg: string
  isCreate: boolean
  uploaded: boolean;
  addOrUpdate: string;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private apiService: EventApiService) {
  }

  ngOnInit() {

    this.uploaded = false;

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.uploaded = true;
      alert('Success!');
    };

    this.apiService.getEvents().subscribe(
      (res) => {
        this.events = [];
        for (var x = 0; ; x++) {
          if (res[x] == null) break;
          this.events.push(res[x])
        }
      }, (error) => {
        console.log(error);
      });
  }

  createEvent() {
    this.title = ''
    this.description = ''
    this.location = ''
    this.date = ''
    this.time = ''
    this.img = ''
    this.isCreate = true;
    this.addOrUpdate = 'add';
    $('#myModal').modal('show');
  }

  updateItem($obj, $index) {
    this.updating_event = $obj;
    this.title = this.updating_event.title;
    this.description = this.updating_event.description;
    this.location = this.updating_event.location;
    this.date = this.updating_event.e_date;
    this.time = this.updating_event.e_time;
    this.img = this.updating_event.img;
    this.currentImg = this.updating_event.img;
    this.isCreate = false;
    this.addOrUpdate = 'update'
    $('#myModal').modal('show');
  }

  saveEvent() {
    this.uploader.uploadAll();
    if (this.isCreate) {

      if (this.img == null || this.title == '' || this.description == '') {
        alert("Please fill all area");
        return
      }

      var img = this.img;
      var uploadedImgName = img.split("\\");
      var imgName = uploadedImgName[uploadedImgName.length - 1];
      var imgUrl = 'http://localhost:9000/upload/' + imgName;

      var event_tmp = {
        title: this.title,
        description: this.description,
        location: this.location,
        e_date: this.date,
        e_time: this.time,
        img: imgUrl,
        interested: [{name: ""}],
        registered: [{name: ""}]
      };
      this.apiService.createEvent(event_tmp).subscribe(
        (res) => {
          this.events.push(event_tmp);
          this.uploaded = false;
          window.location.reload();
        }, (error) => {
          console.log(error);
        });
    } else {

      var img = this.img;
      var uploadedImgName = img.split("\\");
      var imgName = uploadedImgName[uploadedImgName.length - 1];

//check if you want to change the image
      if (img == this.currentImg){
        var imgUrl = this.currentImg;
      } else {
        var imgUrl = 'http://localhost:9000/upload/' + imgName;
      }
//
      this.updating_event.title = this.title;
      this.updating_event.description = this.description;
      this.updating_event.location = this.location;
      this.updating_event.e_date = this.date;
      this.updating_event.e_time = this.time;
      this.updating_event.img = imgUrl;
      this.apiService.updateEvent(this.updating_event._id, this.updating_event).subscribe(
        (res) => {
          window.location.reload();
        }, (error) => {
          console.log(error);
        });
    }
    $('#myModal').modal('hide');
  }

  removeItem($pk, $index) {
    this.apiService.deleteEvent($pk).subscribe(
      (res) => {
        this.events.splice($index, 1);
      }, (error) => {
        console.log(error);
      });
  }
}
