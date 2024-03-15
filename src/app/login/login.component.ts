import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['test@test', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // Assuming your backend endpoint for login is '/api/login'
      this.http.post<any>('/api/login', { email, password }).subscribe(
        (response) => {
          // Assuming backend returns a boolean value indicating success or failure
          if (response.success) {
            alert('Login Successful!');
            // Redirect to homepage or navigate to another component
          } else {
            alert('Wrong Password or Username!');
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred. Please try again later.');
        }
      );
    } else {
      // Handle invalid form
      console.log('Invalid form!');
    }
  }
}
