import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userForm: FormGroup;
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  };
  isSendOTPButtonActive = false;
  isOtpVisible = false;
  passwordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,}$';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      otp: ['', Validators.required],
    });
  }

  updateSendOTPButton(emailInput: any) {
    this.isSendOTPButtonActive =
      emailInput.valid && emailInput.value.trim() !== '';
  }

  sendOTP() {
    // Placeholder logic for sending OTP
    console.log('OTP sent to:', this.userForm.value.email);
    // Call your backend API to send OTP
    this.http
      .post<any>('your-backend-url/send-otp', {
        email: this.userForm.value.email,
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

    // Call your backend API to register the user
    this.http
      .post<any>('your-backend-url/register', this.userForm.value)
      .subscribe(
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
