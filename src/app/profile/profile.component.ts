import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    avatar: 'https://example.com/avatar.jpg',
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'John Doe is a passionate software developer with a keen interest in building innovative solutions to solve real-world problems. He has a strong foundation in various programming languages and frameworks, including JavaScript, Python, and Angular. With a proactive attitude and excellent problem-solving skills, John thrives in dynamic environments and enjoys collaborating with cross-functional teams to deliver high-quality software products. Outside of work, he enjoys hiking, reading, and experimenting with new technologies.',
  };

  isEditingName: boolean = false;
  isChangingPassword: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';

  constructor() {}

  ngOnInit(): void {}

  toggleEditName() {
    this.isEditingName = !this.isEditingName;
  }

  toggleChangePassword() {
    this.isChangingPassword = !this.isChangingPassword;
  }

  saveName() {
    // For demonstration purposes, log the name to the console
    console.log('New name:', this.user.fullName);
    this.isEditingName = false;
  }

  changePassword() {
    // For demonstration purposes, log the current and new passwords to the console
    console.log('Current Password:', this.currentPassword);
    console.log('New Password:', this.newPassword);
    // Implement your logic to change the password here
    // Reset the input fields and hide the change password section
    this.currentPassword = '';
    this.newPassword = '';
    this.isChangingPassword = false;
  }

  getAvatarColor(): string {
    // Generate a random color for the avatar background
    const colors = [
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
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
