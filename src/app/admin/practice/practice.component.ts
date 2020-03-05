// @ts-ignore
import { Component, OnInit } from '@angular/core';

import { PracticeApiService } from '../../apiservice/practice.service';
// @ts-ignore
import { HttpClient } from '@angular/common/http';

import { practice } from '../../model/Practice';
declare var $: any;

// @ts-ignore
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  practices: practice[] = []
  updating_practice: practice
  description: string
  isCreate: boolean
  addOrUpdate: string

  constructor(private apiService:PracticeApiService, private http: HttpClient) { }

  ngOnInit() {
    this.apiService.getPractices().subscribe(
      (res) => {
        this.practices = [];
        for(var x=0;; x++){
          if(res[x] == null) break;
          this.practices.push(res[x])
        }
      }, (error) => {
        console.log(error);
      });

  }

  createPractice() {
    this.description = ''
    this.isCreate = true;
    this.addOrUpdate = 'add';
    $('#myModal').modal('show');
  }
  updateItem($obj, $index) {
    this.updating_practice = $obj
    this.description = this.updating_practice.description;
    this.addOrUpdate = 'update';
    $('#myModal').modal('show');
  }

  savePractice(){
    if(this.isCreate){

      var practice_tmp = {
        description: this.description,
        interested: [{name:""}],
        registered: [{name:""}]
      };
      this.apiService.createPractice(practice_tmp).subscribe(
        (res) => {
          this.practices.push(practice_tmp);
          window.location.reload();
        }, (error) => {
          console.log(error);
        });
    }
    else {
      this.updating_practice.description = this.description;
      this.apiService.updatePractice(this.updating_practice._id, this.updating_practice).subscribe(
        (res) => {
          window.location.reload();
        }, (error) => {
          console.log(error);
        });
    }
    $('#myModal').modal('hide');
  }

  removeItem($pk, $index){
    this.apiService.deletePractice($pk).subscribe(
      (res) => {
        this.practices.splice($index, 1);
      }, (error) => {
        console.log(error);
      });
  }
}
