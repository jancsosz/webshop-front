import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username = 'test';
  password = '12345';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  login(): void {
    this.loginService.loginPOST(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .then(response => {
        console.log('succ', response);
      })
      .catch(error => this.tokenService.setAccessToken(error.headers.get('Authorization')));
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      password: [this.password, Validators.required]
    });
  }
}
