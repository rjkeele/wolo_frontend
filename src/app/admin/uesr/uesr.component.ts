import { Component, OnInit, NgZone  } from '@angular/core';
import { Router } from '@angular/router';


import { UserApiService } from '../../apiservice/userapi.service';


import { User } from '../../model/User';
import {log} from 'util';

@Component({
  selector: 'app-uesr',
  templateUrl: './uesr.component.html',
  styleUrls: ['./uesr.component.css']
})
export class UesrComponent implements OnInit {

  users:User[];
  loginFlag: number;

  constructor(private apiService:UserApiService,private ngZone: NgZone,private router: Router) { }

  ngOnInit() {

    this.apiService.getUsers().subscribe(
      (res) => {
        // this.users = res
        this.users = [];
        for(var x=0;; x++){
          if(res[x] == null) break;
          this.users.push(res[x]);
        }

        //this.ngZone.run(() => this.router.navigateByUrl('/admin'))
      }, (error) => {
        console.log(error);
      });
  }

  removeEmployee($id, $row_num) {
    this.apiService.deleteUser($id).subscribe(
      (res) => {
        // this.users = res
        this.users.splice($row_num, 1);
        //this.ngZone.run(() => this.router.navigateByUrl('/admin'))
      }, (error) => {
        console.log(error);
      });
  }
}
