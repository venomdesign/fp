import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { User } from './User'
import { HTTP_SERVICE_VARIABLES } from '../services/http-service-variables';

@Injectable()
export class RegistrationServiceService {
  http: Http;

  posts_Url: string = HTTP_SERVICE_VARIABLES.endpointUrl + 'v' + HTTP_SERVICE_VARIABLES.apiVersion + '/Administration/AddUser';
  public constructor(http: Http) {
    this.http = http;
  }
  registerUser(user: User) {
    console.log(user);
    user.USER_SYS_ID = "0";
    user.IS_ACTIVE = "0";
    user.IS_LOCKED = "0";
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.posts_Url, '=' + JSON.stringify(user), { headers: headers }).map(res => res.json());
  }


}
