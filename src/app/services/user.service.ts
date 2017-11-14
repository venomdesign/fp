import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HTTP_SERVICE_VARIABLES } from './http-service-variables';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  isEmailRegistered(email: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const endpoint = HTTP_SERVICE_VARIABLES.endpointUrl
    + '/v'
    + HTTP_SERVICE_VARIABLES.apiVersion
    + '/ValidateEmail?SSO=true&email='
    + email;

    console.log('Endpoint: ', endpoint);

    return this.http.post(endpoint, { headers: headers })
      .map((response: Response) => response.json())
      .catch(response => {
        // The error callback (second parameter) is called
        return Observable.throw(response.json());
        // The success callback (first parameter) is called
        // return Observable.of(response.json());
      });
  }
}
