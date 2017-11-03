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

    constructor(private auth: AuthService, private common: CommonService) { }

    ngOnInit() {
        // if (this.auth.userProfile) {
        //     this.profile = this.auth.userProfile;
        // } else {
        //     this.auth.getProfile((err, profile) => {
        //         this.profile = profile;
        //         this.getClaims();
        //     });
        // }
        this.auth.currentUserProfile.subscribe(
            (profile) => {
                this.profile = profile;
                console.log('My profile: ', this.profile);
                this.getClaims(this.profile.name);
            },
            (error) => {
                console.log('Shit broke: ', error);
            },
            () => {}
        );
    }

    private getClaims(email) {
        this.common.getClaimsByEmailAddress(email);
    }
}
