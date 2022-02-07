import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login';
import { LoginService } from 'src/services/login.service';
declare let alertify: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  logins!: Login[]
  createForm!: FormGroup;
  editForm!: FormGroup;

  ngOnInit(): void {
    let userId: number = 0
    const userIdStr = localStorage.getItem("user_id")
    if (userIdStr) {
      const userIdint = parseInt(userIdStr)
      if (userIdint)
        userId = userIdint
    }



    this.GetLogins()
    this.createForm = this.formBuilder.group({
      url: '',
      identity: '',
      password: '',
      userId: userId
    })

    this.editForm = this.formBuilder.group({
      id: '',
      url: '',
      identity: '',
      password: '',
      userId: userId
    })

  }

  GetLogins() {
    const userId = localStorage.getItem("user_id")
    if (userId) {
      this.loginService.GetLoginsByUserId(parseInt(userId))
        .subscribe(res => { this.logins = res })
    }
  }

  GetUserId(): number {
    const userIdStr = localStorage.getItem("user_id")
    if (userIdStr) {
      const userId = parseInt(userIdStr)
      if (userId)
        return userId
      else
        return 0
    }
    else
      return 0
  }

  CreateLogin(): void {
    let serializedForm = JSON.stringify(this.createForm.getRawValue());
    console.log(serializedForm)
    this.http.post<Login>(environment.apiUrl + '/logins', serializedForm)//, {withCredentials: true})
      .subscribe(res => { alertify.success("Login added successfully."); this.GetLogins(); })

  }

  InsertEditModal(login: Login): void {
    this.editForm.controls['id'].setValue(login.id);
    this.editForm.controls['url'].setValue(login.url);
    this.editForm.controls['identity'].setValue(login.identity);
    this.editForm.controls['password'].setValue(login.password);
    //(document.getElementById('editUrl') as HTMLInputElement).value = login.url;
    //(document.getElementById('editIdentity') as HTMLInputElement).value = login.identity;
    //(document.getElementById('editPassword') as HTMLInputElement).value = login.password;
  }

  EditLogin(): void {
    let serializedForm = JSON.stringify(this.editForm.getRawValue());
    //console.log(serializedForm)
    this.http.put(environment.apiUrl + '/logins', serializedForm)//, {withCredentials: true})
      .subscribe(res => { alertify.success("Login updated successfully."); this.GetLogins(); })
  }

  DeleteLogin(id: number): void {
    this.http.delete(environment.apiUrl + '/logins/' + id)
      .subscribe(res => { alertify.success("Login deleted successfully."); this.GetLogins(); })
  }

  calculateDiff(login: Login): string {
    let updatedTime = new Date(login.updated_at);
    let currentDate = new Date();

    let days = Math.floor((currentDate.getTime() - updatedTime.getTime()) / 1000 / 60 / 60 / 24);

    if (days != 0) {
      return days + " days ago";
    } else {
      const diffInMs = currentDate.getTime() - updatedTime.getTime();
      const diffInHours = diffInMs / 1000 / 60 / 60;
      return Math.ceil(diffInHours) + " hours ago"
    }


  }

  ShowHidePw() {
    const inputs = document.getElementsByClassName('pw-input') as HTMLCollectionOf<HTMLInputElement>
    for (let i = 0; i < inputs.length; i++) {
      const element = inputs[i];
      if (element.type == "text") {
        element.type = "password"
      } else if (element.type == "password") {
        element.type = "text"
      }
    }
  }

}
