import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../enviorment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  apiUrl = environment.apiUrl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user_email: ['s@s.com', [Validators.required, Validators.email]],
      user_password: ['tesT@123', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const user_email = this.loginForm.value.user_email;
      const user_password = this.loginForm.value.user_password;

      // Assuming your backend endpoint for login is '/api/login'
      this.http
        .post<any>(`${this.apiUrl}/login`, {
          user_email,
          user_password,
        })
        .subscribe(
          (response) => {
            // Assuming backend returns a boolean value indicating success or failure
            if (response.success) {
              // Navigate to homepage
              this.router.navigate(['/']);
              // Show custom MUI alert
              this._snackBar.open('Login Successful!', 'Close', {
                duration: 3000, // Duration in milliseconds
              });
            } else {
              // Handle invalid login credentials
              console.log('Wrong Password or Username!');
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
