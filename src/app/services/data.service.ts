import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HTTP_SERVICE_VARIABLES } from './http-service-variables';

@Injectable()
export class DataService {


  constructor(public http: Http) {

  }

  getUsers() {
    let getUrl = HTTP_SERVICE_VARIABLES.endpointUrl + 'v' + HTTP_SERVICE_VARIABLES.apiVersion + '/Administration/GetUsers';
    return this.http.get(getUrl)
      .map(res => res.json());
  }

  /* addUser(userName, firstname){
       this.selectedUser = null;
       let user = {
           'userName': userName.trim();
           'firstname': firstname.trim()
       }
       if(!user.userName || !user.firstname){
           return;
       }
       this.UserService.createUser(user).then(res => { this.users.push(res); })
   }


/*    addUser(email:string, password:string){

       var addUserUrl="http://localhost:56086/api/v1/Administration/AddUser";
       return this.http.post(addUserUrl,JSON.stringify({user: password,email: email }),
           {headers:new Headers({'Content-Type':'application/json'})}
           ).map(res=>res.json()).
           subscribe(
               data => localStorage.setItem('id_token',data.auth_token),
               error=>console.log(error)
           );
   }*/
}
