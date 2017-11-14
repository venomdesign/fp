/*import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // prepopulate the email address, if present
        if (localStorage.getItem('currentEmail') !== null && localStorage.getItem('currentEmail') === 'validfopsnosso@test.com') {
            this.model = {username: localStorage.getItem('currentEmail')};
            localStorage.removeItem('currentEmail');
        }
    }

    login() {
        // TODO: Remove. This is faked for demonstration purposes only.
        if (this.model.username === 'ric.castagna@gmail.com' && this.model.password === 'asdf1234') {
            this.router.navigate(['/invoice']);
        }

        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}*/

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
    password: ["", Validators.required]
  });
  constructor(public fb: FormBuilder) {}
  doLogin(event) {
    let formData = this.loginForm.value;
    let email = this.loginForm.controls.email.value;
    console.log(event);
    console.log(this.loginForm.value);
  }
}