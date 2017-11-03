import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    isEmailRegisterd(email: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:56086/api/v1/ValidateEmail', JSON.stringify({ email: email }), { headers: headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json());
        ;
    }
}