import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {}

  // Method to update isAdmin status
  updateIsAdmin(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }

  isLoggedIn(): boolean {
    // Implement logic to check if the user is logged in
    // Return true if logged in, false otherwise
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): boolean {
    // Implement logic to check if the user is an admin
    // Return true if admin, false otherwise
    return localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    // Update isAdmin status to false upon logout
    this.updateIsAdmin(false);
    // Implement logout logic, such as clearing local storage, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }
}
