import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking/booking.service';
import { AuthenticationService } from '../../authentication.service';

interface Booking {
  id: number;
  date: string;
  space: string;
  status: string;
  // Add other booking details as needed
}

interface SwapRequest {
  id: number;
  date: string;
  space: string;
  sender: string;
  // Add other swap request details as needed
}

interface PendingBooking {
  id: number;
  date: string;
  space: string;
  status: string;
}

interface PendingCancellation {
  id: number;
  date: string;
  space: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // make dummy data for bookings and swapRequests
  bookings: Booking[] = [
    { id: 1, date: '12', space: 'Cubicle', status: 'Booked' },
    { id: 2, date: '14', space: 'Office Seat', status: 'Booked' },
  ];
  swapRequests: SwapRequest[] = [
    { id: 1, space: 'Cubicle', date: '12', sender: 'James Salvador' },
    { id: 2, space: 'Cubicle', date: '12', sender: 'Peaky Blinders' },
  ];
  pendingBookings: PendingBooking[] = [
    { id: 1, date: '16', space: 'Office Seat', status: 'Pending Approval' },
    { id: 2, date: '18', space: 'Cubicle', status: 'Pending Approval' },
  ];

  pendingCancellations: PendingCancellation[] = [
    { id: 1, date: '20', space: 'Office Seat', status: 'Pending Approval' },
    { id: 2, date: '22', space: 'Cubicle', status: 'Pending Approval' },
  ];
  isAdmin: boolean = false;

  constructor(
    private bookingService: BookingService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchBookingDetails();
    this.fetchSwapRequests();
    this.isAdmin = this.authService.isAdmin();
  }

  fetchBookingDetails(): void {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  fetchSwapRequests(): void {
    this.bookingService.getSwapRequests().subscribe((swapRequests) => {
      this.swapRequests = swapRequests;
    });
  }

  cancelBooking(booking: Booking): void {
    this.bookingService.cancelBooking(booking.id).subscribe(() => {
      booking.status = 'Cancellation Pending';
    });
  }

  acceptSwapRequest(swapRequest: SwapRequest): void {
    this.bookingService.acceptSwapRequest(swapRequest.id).subscribe(() => {
      // You can update the UI or perform other actions here
    });
  }

  rejectSwapRequest(swapRequest: SwapRequest): void {
    this.bookingService.rejectSwapRequest(swapRequest.id).subscribe(() => {
      // You can update the UI or perform other actions here
    });
  }
}
