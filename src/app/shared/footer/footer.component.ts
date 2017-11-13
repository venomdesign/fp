import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();

    constructor() { }

    ngOnInit() {$(".k-grid-header").removeAttr("style");}
}
