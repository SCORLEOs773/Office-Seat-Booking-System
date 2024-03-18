import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    avatar: 'https://example.com/avatar.jpg',
    user_fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'John Doe is a passionate software developer with a keen interest in building innovative solutions to solve real-world problems. He has a strong foundation in various programming languages and frameworks, including JavaScript, Python, and Angular. With a proactive attitude and excellent problem-solving skills, John thrives in dynamic environments and enjoys collaborating with cross-functional teams to deliver high-quality software products. Outside of work, he enjoys hiking, reading, and experimenting with new technologies.',
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

  constructor(private profileService: ProfileService) {}

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
      },
      (error) => {
        console.error('Error updating name:', error);
        // Handle error appropriately
      }
    );
  }

  changePassword() {
    this.profileService
      .updateUserPassword(this.user_old_password, this.user_new_password)
      .subscribe(
        () => {
          console.log('Password updated successfully');
          // Reset the input fields and hide the change password section
          this.user_old_password = '';
          this.user_new_password = '';
          this.isChangingPassword = false;
        },
        (error) => {
          console.error('Error updating password:', error);
          // Handle error appropriately
        }
      );
  }

  getAvatarColor(): string {
    // Choose a fixed index to select a color from the colors array
    const fixedIndex = this.user.user_fullName.length % this.colors.length;
    return this.colors[fixedIndex];
  }
}
