import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
