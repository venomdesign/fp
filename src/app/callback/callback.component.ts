import { AuthService } from '../services/auth.service';
import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.sass']
})

export class CallbackComponent implements OnInit {
    currentUserProfile: any;
    userClaims: any;

    constructor(private auth: AuthService, private common: CommonService) { }

    ngOnInit() {
        this.currentUserProfile = this.auth.currentUserProfile.subscribe();
        console.log('Current user profile: ', this.currentUserProfile);
        this.userClaims = this.common.getClaimsByEmailAddress(this.currentUserProfile.name);
        console.log('User claims: ', this.userClaims);
    }

}
