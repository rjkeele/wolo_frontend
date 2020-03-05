import { Component, OnInit, NgZone  } from '@angular/core';
import { Router } from '@angular/router';


import { UserApiService } from '../../apiservice/userapi.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  fullname: string = '';
  password: string = '';
  confirm: string = '';

  constructor(private apiService:UserApiService,private ngZone: NgZone,private router: Router) { }

  ngOnInit() {
  }

  sign_up() {
    if(this.password != this.confirm){
      this.confirm = '';
      alert('Password doesn\'t match');
      return
    }
    var data = {
      email: this.email,
      fullname: this.fullname,
      password: this.password
    }

    this.apiService.createUser(data).subscribe(
      (res) => {
        if(res == 'ID_err') {
          alert('Email Error')
          return
        }
        alert('Success!')
        this.ngZone.run(() => this.router.navigateByUrl('/home/login'))
      }, (error) => {
        console.log(error);
      });
  }

}
