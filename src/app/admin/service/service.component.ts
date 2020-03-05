import { Component, OnInit } from '@angular/core';

import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';

import { front_end_config } from '../../apiservice/config';
import { ServiceApiService } from '../../apiservice/service.service';
import { HttpClient } from '@angular/common/http';

import { service } from '../../model/Service';
declare var $: any;

const URL = 'http://localhost:9000/api/upload';

// @ts-ignore
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: service[] = [];
  updating_service: service;
  title: string;
  description: string;
  img: string;
  currentImg: string;
  isCreate:boolean;
  uploaded:boolean;
  addOrUpdate: string;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  constructor(private apiService:ServiceApiService, private http: HttpClient) {}

  ngOnInit() {

    this.uploaded = false;

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.uploaded = true;
      alert('Success!');
    };

    this.apiService.getServices().subscribe(
      (res) => {
        this.services = [];
        for(var x=0;; x++){
          if(res[x] == null) break;
          this.services.push(res[x])
        }
      }, (error) => {
        console.log(error);
      });
  }

  createservice() {
    this.isCreate = true;
    this.title = '';
    this.description = '';
    this.img = null;
    this.addOrUpdate = 'add';
    $('#myModal').modal('show');
  }
  updateItem($obj, $index) {
    this.updating_service = $obj;
    this.title = this.updating_service.title;
    this.description = this.updating_service.description;
    this.img = this.updating_service.img;
    this.currentImg = this.updating_service.img;
    this.isCreate = false;
    this.addOrUpdate = 'update';
    $('#myModal').modal('show');
  }

  // handleFileInput(files: FileList) {
  //   this.img = files.item(0);
  // }

  saveservice(){
    this.uploader.uploadAll();
    if(this.isCreate){
      if(this.img == null || this.title == '' || this.description == ''){
        alert("Please fill all area");
        return
      }

      // var formdata = new FormData()
      // formdata.append('img', this.img)
      // formdata.append('title', this.title)
      // formdata.append('description', this.description)
      // console.log(formdata)
      var img = this.img;
      var uploadedImgName = img.split("\\");
      var imgName = uploadedImgName[uploadedImgName.length - 1];
      var imgUrl = 'http://localhost:9000/upload/' + imgName;

      var service_tmp = {
        title: this.title,
        description: this.description,
        img: ''+imgUrl
      };
      this.apiService.createService(service_tmp).subscribe(
        (res) => {
          this.services.push(service_tmp);
          window.location.reload();
        }, (error) => {
          console.log(error);
        });
    }
    else {
//check whether you want to change the image.
//       if (this.currentImg != this.img && !this.uploaded) {
//         alert('Please upload the image first.');
//         return;
//       }
//
      var img = this.img;
      var uploadedImgName = img.split("\\");
      var imgName = uploadedImgName[uploadedImgName.length - 1];

      if (img == this.currentImg) {
        var imgUrl = this.currentImg;
      } else {
        var imgUrl = 'http://localhost:9000/upload/' + imgName;
      }

      this.updating_service.title = this.title;
      this.updating_service.description = this.description;
      this.updating_service.img = imgUrl;
      this.apiService.updateService(this.updating_service._id, this.updating_service).subscribe(
        (res) => {
          window.location.reload();
        }, (error) => {
          console.log(error);
        });
    }
    $('#myModal').modal('hide');
  }

  removeItem($pk, $index){
    this.apiService.deleteService($pk).subscribe(
      (res) => {
        this.services.splice($index, 1);
      }, (error) => {
        console.log(error);
      });
  }

}
