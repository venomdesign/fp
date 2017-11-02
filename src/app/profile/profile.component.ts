import { CommonService } from './../services/common.service';
import { GlobalService } from '../services/global.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

    profile: any;

    constructor(public auth: AuthService, private common: CommonService) { }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
                this.getClaims();
            });
        }
    }

    private getClaims() {
        this.common.getClaimsByEmailAddress(this.profile.name);
    }
}
