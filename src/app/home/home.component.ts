import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  isAuthenticated = false;

  title = 'app';
  formSubmitclicked = false;

  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.minLength(3)
      ],
        this.isEmailUnique.bind(this)
      ]
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
  onSubmit() {
    alert("yup");
    this.formSubmitclicked = true;
  }
}
