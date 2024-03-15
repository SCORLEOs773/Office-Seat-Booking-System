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
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'; // Password pattern (at least 8 characters, including uppercase, lowercase letters, and numbers)

  constructor(private formBuilder: FormBuilder) {
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
    console.log('OTP sent to:', this.user.email);
    this.isOtpVisible = true; // Show OTP input field after sending OTP
  }

  register() {
    // Perform validation and registration logic here
    console.log('User registered:', this.user);

    // Reset form after successful registration
    this.resetForm();
  }

  resetForm() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      otp: '', // Reset OTP field too
    };
    this.isOtpVisible = false; // Hide OTP input field
  }
}
