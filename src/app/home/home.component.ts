import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator } from  '../shared/validation/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
  isAuthenticated = false;

  title = 'app';
  formSubmitclicked = false;
  isAllowed = false;
  form: FormGroup;
  isDisabled: string;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.buildForm();
    this.isDisabled = localStorage.getItem('isDisabled');
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
    else if(this.email.value == "FOPSWITHSSO@TEST.COM"){
      localStorage.setItem("title", "Something Wrong");
      localStorage.removeItem('isDisabled');
      this.router.navigate(['/error']);
    }
    else if(this.email.value == "BLOCKEDSSO@TEST.COM"){
      localStorage.setItem("title", "Please Contact Help Desk");
      localStorage.removeItem('isDisabled');
      this.router.navigate(['/error']);
    } else if(this.email.value == "NOFOPSWITHSSO@TEST.COM"){
      //alert("Disabled fields");
      localStorage.setItem('isDisabled', 'true');
      localStorage.setItem('title', "No FOPS with SSO");
      this.router.navigate(['/register']);

    } else if(this.email.value == "NOFOPSNOSSO@TEST.COM") {
      localStorage.setItem('title', "No FOPS No SSO");
      localStorage.setItem('isDisabled', 'false');
      this.router.navigate(['/register']);

    } else { 
      localStorage.setItem("title", "You Already have a FOPS account");
      localStorage.removeItem('isDisabled');
      this.router.navigate(['/error']);
    }
  }
}
