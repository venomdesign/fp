import { Component, OnInit, Input } from '@angular/core';
import { RegistrationServiceService } from './registration-service.service';
import { User } from './User'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmailValidator } from  '../shared/validation/forms';

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
  
  responseStatus: Object = [];
  status: boolean;
  loading: boolean;

  public location = '';
  ngOnInit() {
    this.user = new User();
    localStorage.getItem("title");
    if(localStorage.getItem("title") == "No FOPS with SSO"){
      
      //if(this.isDisabled == 'true'){
       // alert('yes');
      //}
    }
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
          lastName: new FormControl('', [
              Validators.maxLength(50), 
              Validators.pattern('[a-zA-Z ]*'), 
              Validators.required]),
      email: new FormControl('', [
          Validators.maxLength(50), 
          EmailValidator.isValidMailFormat, 
          Validators.required]),
          password: new FormControl('', [
              Validators.maxLength(50), 
              Validators.required]),
          confirmPassword: new FormControl('', [
              Validators.maxLength(50), 
              Validators.required])
*/