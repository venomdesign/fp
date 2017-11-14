import { Component, Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})

export class AppComponent {

    constructor(public location: Location, private router: Router) {
        this.checkForCurrentTokens();
    }

    checkForCurrentTokens() {
        if (localStorage.getItem('isValidSso') === 'true' &&
            localStorage.getItem('isValidFops') === 'true' &&
            localStorage.getItem('isAuthenticated') === 'true' &&
            localStorage.getItem('isSsoBlocked') === 'false') {
            this.router.navigate(['/invoice']);
        } else if (localStorage.getItem('isAuthenticated') === 'false' &&
            localStorage.getItem('isValidFops') === 'false' &&
            localStorage.getItem('isValidSso') === 'false' &&
            localStorage.getItem('isSsoBlocked') === 'false') {
            this.router.navigate(['/login']);
        }
    }

    removeFooter() {
        let title = this.location.prepareExternalUrl(this.location.path());
        title = title.slice(1);
        if (title === 'signup' || title === 'nucleoicons') {
            return false;
        } else {
            return true;
        }
    }
}
