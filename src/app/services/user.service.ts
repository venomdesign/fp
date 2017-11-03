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
    return this.http.post(HTTP_SERVICE_VARIABLES.endpointUrl + '/v' + HTTP_SERVICE_VARIABLES.apiVersion + '/ValidateEmail?SSO=true&email=' + email, { headers: headers })
      .map((response: Response) => response.json())
      .catch(response => {
        // The error callback (second parameter) is called
        return Observable.throw(response.json());
        // The success callback (first parameter) is called
        // return Observable.of(response.json());
      });
  }

  /* intercept(observable: Observable<any>)
   {
       return observable.catch(error =>
       {

           if (error.status === 401) {
               alert("401");
           } else if (error.status === 403) {
               alert("403");
           } else if (error.status === 200) {
               alert("200");    
           } else {
               return Observable.throw(error);
           }
       });
   }*/
  private handleError(error: any) {

    if (error.status == 401) {
      alert("401");
      // add yo routing yo
    }
    if (error.status == 403) {
      alert("403");
    }
    if (error.status == 200) {
      alert("200");
    } else {
      return Observable.throw(error.json().error || 'Server error');
    }
  }

  /*private handleError(error: any) {
      console.log(error);
      return Observable.throw(error.json());
  }*/
}
