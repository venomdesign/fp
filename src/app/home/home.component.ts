import { Component, OnInit, Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { Router } from '@angular/router';

import { EmailValidator } from '../shared/index';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
    model = {
        left: true,
        middle: false,
        right: false
    };
  isAuthenticated = false;

  title = 'app';
  formSubmitclicked = false;
  isAllowed = false;
  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: new FormControl('', [
          Validators.maxLength(30), 
          EmailValidator.isValidMailFormat, 
          Validators.required])
    });

  } create
  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.userService.isEmailRegistered(control.value).subscribe(() => {
          resolve(null);
        }, () => { resolve({ 'isEmailUnique': true }); });
      }, 1000);
    });
    return q;
  }
  get email() { return this.form.get('email'); }
  onSubmit() {
    if(this.email.value == "" || this.email.value == null){
      return false;
    }
    //console.log(this.message);
    else if(this.email.value.toUpperCase() == "FOPSWITHSSO@TEST.COM"){
      localStorage.setItem("title", "Something Wrong");
      this.router.navigate(['/pages/fwsso']);
    }
    else if(this.email.value == "BLOCKEDSSO@TEST.COM"){
      localStorage.setItem("title", "Please Contact Help Desk");
      this.router.navigate(['/pages/blockedsso']);
    } else if(this.email.value == "NOFOPSWITHSSO@TEST.COM"){
      //alert("Disabled fields");
      localStorage.setItem('title', "No FOPS with SSO");
      this.router.navigate(['/registration']);

    } else if(this.email.value == "NOFOPSNOSSO@TEST.COM") {
      localStorage.setItem('title', "No FOPS No SSO");
      this.router.navigate(['/registration']);

    } else { 
      localStorage.setItem("title", "You Already have a FOPS account");
      this.router.navigate(['/pages/fopsuser']);
    }
  }
}
