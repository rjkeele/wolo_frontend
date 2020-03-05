import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
  }

  log_out() {
    localStorage.setItem("loginFlag", "false");
    this.router.navigateByUrl('/');
  }

}
