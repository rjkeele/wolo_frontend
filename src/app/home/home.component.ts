// @ts-ignore
import {Component, OnDestroy, OnInit} from '@angular/core';

import { front_end_config } from '../apiservice/config';
import { MailApiService } from '../apiservice/mail.server';

declare var $: any;

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mail_to: string = front_end_config.mail_to
  send_from: string
  password: string
  subject: string
  mailtext: string
  is_sending: boolean

  constructor(private apiService:MailApiService) { }

  ngOnInit() {
  }

  openMailDlg(){
    $('#myModal_mail_to').modal('show')
  }

  sendNewMail() {
    var server = this.mail_to
    var tmp_arr = server.split('@')
    server = tmp_arr[1]
    tmp_arr = server.split('.')
    server = tmp_arr[0]

    var mail_info = {
      server : server,
      send_from : this.send_from,
      password: this.password,
      mail_to: this.mail_to,
      subject: this.subject,
      mailtext: this.mailtext
    }

    this.is_sending = true

    this.apiService.sendMail(mail_info).subscribe(
      (res) => {
        this.send_from = ''
        this.password = ''
        this.subject = ''
        this.mailtext = ''
        this.is_sending = false
        if(res=='ok') {
          alert('Send mail succesfully')
        }
        else {
          alert('Error')
        }
        $('#myModal_mail_to').modal('hide')
      }, (error) => {
        console.log(error);
      });
  }

}
