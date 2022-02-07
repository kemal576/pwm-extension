import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login';
import { LoginCreateModel } from 'src/models/loginCreateModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  GetLoginsByUserId(userId:number) {
    return this.http.get<Login[]>(environment.apiUrl + "/user/"+userId+"/logins")//+userId)
  }

  CreateLogin(login:LoginCreateModel) {
    return this.http.post(environment.apiUrl+"/logins",login)
  }


}
