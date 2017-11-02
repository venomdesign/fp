import { Injectable } from '@angular/core';
import {HttpModule, Http,Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { User } from './User'
@Injectable()
export class RegistrationServiceService {
    http: Http;
  
    posts_Url: string = 'http://localhost:56086/api/v1/Administration/AddUser';
    public constructor(http : Http) {
    	this.http = http;
	}
    registerUser(user:User) {
    	console.log(user);
        user.USER_SYS_ID = "0";
        user.IS_ACTIVE = "0";
        user.IS_LOCKED = "0";
		const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.post(this.posts_Url, '=' + JSON.stringify(user), {headers: headers}).map(res=>res.json());
	}


}
