import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    })
  }

  submit(): void {
    let serializedForm = JSON.stringify(this.form.getRawValue());
    this.http.post('http://localhost:5764/users',serializedForm)
      .subscribe(() => {this.router.navigate(['/'])})
  }

}
