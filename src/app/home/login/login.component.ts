import {Component, OnInit, NgZone, OnChanges} from '@angular/core';
import {Router} from '@angular/router';


import {UserApiService} from '../../apiservice/userapi.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private apiService: UserApiService, private ngZone: NgZone, private router: Router) {
  }

  ngOnInit() {
    var loginFlag = localStorage.getItem("loginFlag");
    if (loginFlag && loginFlag == 'true') {
      this.ngZone.run(() => this.router.navigateByUrl('/admin/user'));
    } else {
    }
  }

  sign_in() {
    // alert('sdfsdf');
    var data = {
      email: this.email,
      password: this.password
    };

    this.apiService.loginUser(data).subscribe(
      (res) => {
        if (res == 'err') {
          alert('Please fill out all the fields');
          return
        }

        if (res.ret == 1) {
          alert('Invalid Email or Password.');
          return
        }

        localStorage.setItem("loginFlag", "true");
        window.location.reload();


      }, (error) => {
        console.log(error);
      });
  }

}
