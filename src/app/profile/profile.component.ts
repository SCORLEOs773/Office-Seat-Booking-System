import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    avatar: 'https://example.com/avatar.jpg',
    user_fullName: localStorage.getItem('user_fullname') || 'John Doe',
    email: localStorage.getItem('user_email') || 'john@example.com',
    bio: `${localStorage.getItem(
      'user_fullname'
    )} is a passionate software developer with a keen interest in building innovative solutions to solve real-world problems. ${localStorage.getItem(
      'user_fullname'
    )} has a strong foundation in various programming languages and frameworks, including JavaScript, Python, and Angular. With a proactive attitude and excellent problem-solving skills, ${localStorage.getItem(
      'user_fullname'
    )} thrives in dynamic environments and enjoys collaborating with cross-functional teams to deliver high-quality software products. Outside of work, ${localStorage.getItem(
      'user_fullname'
    )} enjoys hiking, reading, and experimenting with new technologies.`,
  };

  isEditingName: boolean = false;
  isChangingPassword: boolean = false;
  user_old_password: string = '';
  user_new_password: string = '';

  private colors: string[] = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
  ];

  constructor(
    private profileService: ProfileService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  toggleEditName() {
    this.isEditingName = !this.isEditingName;
  }

  toggleChangePassword() {
    this.isChangingPassword = !this.isChangingPassword;
  }

  saveName() {
    this.profileService.updateUserName(this.user.user_fullName).subscribe(
      () => {
        console.log('Name updated successfully');
        this.isEditingName = false;
        this.showSuccessAlert('Name updated successfully');
      },
      (error) => {
        console.error('Error updating name:', error);
        this.showErrorAlert('Failed to update name');
      }
    );
  }

  changePassword() {
    this.profileService
      .updateUserPassword(this.user_old_password, this.user_new_password)
      .subscribe(
        () => {
          console.log('Password updated successfully');
          this.user_old_password = '';
          this.user_new_password = '';
          this.isChangingPassword = false;
          this.showSuccessAlert('Password updated successfully');
        },
        (error) => {
          console.error('Error updating password:', error);
          this.showErrorAlert('Failed to update password');
        }
      );
  }

  private showSuccessAlert(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['success-snackbar'], // Custom CSS class for success alerts
    });
  }

  private showErrorAlert(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['error-snackbar'], // Custom CSS class for error alerts
    });
  }

  getAvatarColor(): string {
    // Choose a fixed index to select a color from the colors array
    const fixedIndex = this.user.user_fullName.length % this.colors.length;
    return this.colors[fixedIndex];
  }
}
