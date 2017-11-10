import { Component, OnInit, Input } from '@angular/core';
import { RegistrationServiceService } from './registration-service.service';
import { User } from './User'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmailValidator } from  '../shared/validation/forms';
import { TextMaskModule } from '../../../node_modules/angular2-text-mask';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
  providers: [RegistrationServiceService]
})
export class RegistrationComponent implements OnInit {
  title = localStorage.getItem("title");
  isDisabled = localStorage.getItem('isDisabled');
  constructor(private _registrationService: RegistrationServiceService, private router: Router) { }
  @Input() user: User;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  responseStatus: Object = [];
  status: boolean;
  loading: boolean;

  public location = '';
  ngOnInit() {
    this.user = new User();

  
  }

  register() {
    this._registrationService.registerUser(this.user).subscribe(
      data => {
        console.log(this.responseStatus = data)
        this.router.navigate(["/thankyou"]);
      },
      err => console.log(err),
      () => console.log('Request Completed')
    );

    this.status = true;
  }
}

/*
firstName: new FormControl('', [
              Validators.maxLength(50), 
              Validators.pattern('[a-zA-Z ]*'),
              Validators.required
              ]),
          middleName: new FormControl('', [
              Validators.maxLength(1), 
              Validators.pattern('[a-zA-Z]*'), 
              Validators.required]),              
          lastName: new FormControl('', [
              Validators.maxLength(50), 
              Validators.pattern('[a-zA-Z ]*'), 
              Validators.required]),
          companyId: new FormControl('', [
              Validators.maxLength(50), 
              Validators.required]),
          phoneNumber: new FormControl('', [
              Validators.maxLength(14), 
              Validators.required]),
          phoneExt: new FormControl('', [
              Validators.maxLength(5), 
              Validators.required]),
          mobileNumber: new FormControl('', [
              Validators.maxLength(14), 
              Validators.required]),
          timeZone: new FormControl('', [Validators.required])
*/

   /*       block all special characters and copy and paste from anything other than text based editor, strip all special characters
          comment: new FormControl('', [
              Validators.maxLength(5), 
              Validators.required]),
          mFaEnabled: new FormControl('', [ Validators.required])
          Mobile NUmber only required qhen slecting YES*/



/*email: new FormControl('', [
          Validators.maxLength(50), 
          EmailValidator.isValidMailFormat, 
          Validators.required]),
          password: new FormControl('', [
              Validators.maxLength(50), 
              Validators.required]),
          confirmPassword: new FormControl('', [
              Validators.maxLength(50), 
              Validators.required]),*/