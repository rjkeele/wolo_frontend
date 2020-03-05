import { Component, OnInit } from '@angular/core';

import { ServiceApiService } from '../../apiservice/service.service';

import { service } from '../../model/Service';
declare var $: any;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services: service[] = []

  constructor(private apiService:ServiceApiService) {}

  ngOnInit() {
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

}
