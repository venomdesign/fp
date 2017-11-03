/*import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    constructor(public auth: AuthService,
        private slimLoadingBarService: SlimLoadingBarService,
        private toastr: ToastsManager,
        vRef: ViewContainerRef) {
          this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        this.auth.handleAuthentication();
    }
}*/


import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  title = 'home';
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
            this.isEmailUnique.bind(this) // async Validator passed as 3rd parameter
       ]
     });
   }

   isEmailUnique(control: FormControl) {
     const q = new Promise((resolve, reject) => {
       setTimeout(() => {
         this.userService.isEmailRegisterd(control.value).subscribe(() => {
           resolve(null);
         }, () => { resolve({ 'isEmailUnique': true }); });
       }, 1000);
     });
     return q;
   }


   onSubmit() {
     this.formSubmitclicked = true;
   }

}
