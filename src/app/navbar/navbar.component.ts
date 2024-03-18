import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false; // Assume user is not admin by default
  isLoggedIn: boolean = false; // Assume user is not logged in by default
  isAdminSubscription: Subscription;

  constructor(
    private authService: AuthenticationService, // Inject the authentication service
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    // Check if the user is admin
    this.isAdmin = this.authService.isAdmin();
    // Subscribe to isAdmin changes
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      // Update isLoggedIn based on isAdmin status
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from isAdmin$ observable to prevent memory leaks
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }
  }

  // Logout function
  logout() {
    // Call the logout method from the authentication service
    this.authService.logout();
    // Redirect to the login page after logout
    this.router.navigate(['/']);
  }
}
