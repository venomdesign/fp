import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.sass']
})

export class CallbackComponent implements OnInit {
    allClaims: any;

    constructor(public auth: AuthService, private common: CommonService) { }

    ngOnInit() {
        console.log('callback.component.ts ngOnInit()');
        this.allClaims = this.common.getClaimsByEmailAddress('ric.castagna@fnf.com');
        console.log('Claims in callback: ', this.allClaims);
    }

}
