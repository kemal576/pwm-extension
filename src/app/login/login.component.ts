import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenResponse } from 'src/models/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null){
      this.router.navigate(['/home'])
    }
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  submit(): void {
    let serializedForm = JSON.stringify(this.form.getRawValue());
    this.http.post<TokenResponse>(environment.apiUrl+'/signin',serializedForm)//, {withCredentials: true})
      .subscribe(res => {
        localStorage.setItem("token",res.token)
        localStorage.setItem("user_id",res.user_id.toString())
        localStorage.setItem("email",res.email)
        this.router.navigate(['/home'])
      })
  }
  
}
