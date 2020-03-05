import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    // window.location.href = 'http:4200/home/home';
    // alert('Please login first');
    // this.ngZone.run(() => this.router.navigateByUrl('/home/login'));
  }

}
