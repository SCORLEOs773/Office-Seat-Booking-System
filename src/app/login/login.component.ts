import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../enviorment';
import { AuthenticationService } from '../../authentication.service';

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
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user_email: ['admin@admin.com', [Validators.required, Validators.email]],
      user_password: ['admin123', Validators.required],
      // user_email: ['s@s.com', [Validators.required, Validators.email]],
      // user_password: ['tesT@123', Validators.required],
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
            // Assuming backend returns a token upon successful login
            if (response.token) {
              // Store the token in local storage
              console.log(response);
              localStorage.setItem('token', response.token);
              //Store user information in local storage
              localStorage.setItem('user_email', response.data.user_email);
              localStorage.setItem(
                'user_fullname',
                response.data.user_fullname
              );
              console.log(response.user_email);
              console.log(response.user_fullname);
              // Check if the user is admin
              const isAdmin =
                user_email === 'admin@admin.com' &&
                user_password === 'admin123';
              // Store isAdmin in local storage
              localStorage.setItem('isAdmin', isAdmin.toString());
              this.authService.updateIsAdmin(isAdmin);
              // Navigate to homepage
              this.router.navigate(['/']);
              // Show custom MUI alert
              this._snackBar.open(
                `Logged in as ${isAdmin ? 'Admin' : 'User'}!`,
                'Close',
                {
                  duration: 3000, // Duration in milliseconds
                }
              );
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

  // // Logout function
  // logout() {
  //   // Call the logout method from the authentication service
  //   this.authService.logout();
  //   // Redirect to the login page after logout
  //   this.router.navigate(['/']);
  // }
}
