import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../Services/jarwis.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email :null
  };

  constructor(
    private Jarvis: JarwisService,
    private notify: SnotifyService,
    private Notify: SnotifyService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Notify.info('Wait...',{timeout:5000})
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.Notify.success('Email is send successfully! Please check your inbox!',{timeout:0})
    this.form.email = null;
  }

}
