import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { RegistrationServiceService } from './registration-service.service';
import { User } from './User';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmailValidator } from '../shared/validation/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.sass'],
    providers: [RegistrationServiceService]
})
export class RegistrationComponent implements OnInit {
    @Input() user: User;

    showPassword: Boolean = false;
    emailDisabled: Boolean = false;
    firstNameDisabled: Boolean = false;
    lastNameDisabled: Boolean = false;
    companyNameDisabled: Boolean = false;

    responseStatus: Object = [];
    status: boolean;
    loading: boolean;

    constructor(private _registrationService: RegistrationServiceService, private router: Router) { }

    public location = '';

    ngOnInit() {
        this.formSetup();
    }

    formSetup() {
        this.user = new User();
        this.user.USER_NAME = localStorage.getItem('currentEmail');
        localStorage.removeItem('currentEmail');

        if (this.user.USER_NAME === 'nossonofops@test.com') {
            this.emailDisabled = true;
            this.showPassword = true;
        }

        if (this.user.USER_NAME === 'validssonofops@test.com') {
            this.emailDisabled = true;
            this.showPassword = false;
            this.user.FIRST_NAME = 'EasyPay';
            this.firstNameDisabled = true;
            this.user.LAST_NAME = 'User';
            this.lastNameDisabled = true;
            this.user.COMPANY_ID = 'Mickey Mouse Real Estate Co.';
            this.companyNameDisabled = true;
        }
    }

    register() {
        console.log(this.user);

        this._registrationService.registerUser(this.user).subscribe(
            data => {
                console.log(this.responseStatus = data);
                this.router.navigate(['/thankyou']);
            },
            err => console.log(err),
            () => console.log('Request Completed')
        );

        this.status = true;
    }
}
