import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../enviorment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  apiUrl = environment.apiUrl;
  userForm: FormGroup;
  user = {
    user_fullname: '',
    user_email: '',
    user_password: '',
    confirmPassword: '',
    user_otp: '',
  };
  isSendOTPButtonActive = false;
  isOtpVisible = false;
  passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,}$';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      user_fullname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      user_otp: ['', Validators.required],
    });
  }

  updateSendOTPButton(emailInput: any) {
    this.isSendOTPButtonActive =
      emailInput.valid && emailInput.value.trim() !== '';
  }

  sendOTP() {
    // Placeholder logic for sending OTP
    console.log('OTP sent to:', this.userForm.value.user_email);
    // Call your backend API to send OTP
    this.http
      .post<any>(`${this.apiUrl}/verify-email`, {
        user_email: this.userForm.value.user_email,
      })
      .subscribe(
        (response) => {
          console.log('OTP sent successfully');
          this.isOtpVisible = true; // Show OTP input field after sending OTP
        },
        (error) => {
          console.error('Failed to send OTP');
          // Handle error appropriately
        }
      );
    this.isOtpVisible = true;
  }

  register() {
    // Perform validation and registration logic here
    console.log('User registered:', this.userForm.value);
    const userData = { ...this.userForm.value };
    delete userData.confirmPassword;

    // Call your backend API to register the user
    this.http.post<any>(`${this.apiUrl}/register`, userData).subscribe(
      (response) => {
        console.log('User registered successfully');
        // Reset form after successful registration
        this.resetForm();
      },
      (error) => {
        console.error('Failed to register user');
        // Handle error appropriately
      }
    );
    this.resetForm();
  }

  resetForm() {
    this.userForm.reset();
  }
}
