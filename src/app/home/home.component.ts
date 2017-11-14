import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';

import { EmailValidator } from '../shared/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
  form;
  response: any;

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ],
        [
          EmailValidator.isUnique
        ])
    });
  }

  get email() { return this.form.get('email'); }

  onSubmit() {
    if(this.email.value == "" || this.email.value == null){
      return false;
    }
    //console.log(this.message);
    else if(this.email.value.toUpperCase() == "FOPSWITHSSO@TEST.COM"){
      localStorage.setItem("title", "Something Wrong");
      //this.router.navigate(['/pages/fwsso']);
    }
    else if(this.email.value == "BLOCKEDSSO@TEST.COM"){
      localStorage.setItem("title", "Please Contact Help Desk");
      //this.router.navigate(['/pages/blockedsso']);
    } else if(this.email.value == "NOFOPSWITHSSO@TEST.COM"){
      //alert("Disabled fields");
      localStorage.setItem('title', "No FOPS with SSO");
      this.router.navigate(['/registration']);

    } else if(this.email.value == "NOFOPSNOSSO@TEST.COM") {
      localStorage.setItem('title', "No FOPS No SSO");
      this.router.navigate(['/registration']);

    } else { 
      localStorage.setItem("title", "You Already have a FOPS account");
      //this.router.navigate(['/pages/fopsuser']);
    }
  }


}
