import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../Services/jarwis.service';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email:null,
    name:null,
    password:null,
    password_confirmation:null
  };

  public error = [];

  constructor(
    private Jarwis:JarwisService,
    private Token:TokenService,
    private router:Router,
    private Auth : AuthService,
    private Notify:SnotifyService
    ) { }

  onSubmit(){
      this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    let _router = this.router;
    this.Notify.confirm('Register Success! , Here is your Profile page.',{
      buttons:[
        {text: 'Okey' , action: toster =>{
          _router.navigateByUrl('/profile'),
          this.Notify.remove(toster.id)
        }
      },
      ]
    })
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

}
