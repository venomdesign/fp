import { GlobalService } from './global.service';
import { HTTP_SERVICE_VARIABLES } from './http-service-variables';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class CommonService {
  userClaims: any;

  constructor(
    private http: Http,
    private progressBar: SlimLoadingBarService,
    private global: GlobalService
  ) { }

  public getClaimsByEmailAddress(emailAddress: string) {
    const payload = 'grant_type=password' + '&' + 'username=' + emailAddress;

    this.progressBar.start();
    this.http
      .post('http://localhost:56086/oauth/token', payload)
      .subscribe(
      (response: Response) => {
        this.userClaims = response.json();
        console.log('Claims returned: ', this.userClaims);
      },
      (error: Response) => { },
      () => {
        this.progressBar.complete();
      }
      );
  }
}
