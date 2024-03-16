import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking/booking.service';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // make dummy data for bookings and swapRequests
  bookings: Booking[] = [
    { id: 1, date: '12', space: 'Cubicle', status: 'Booked' },
    { id: 2, date: '14', space: 'Office Seat', status: 'Booked' },
  ];
  swapRequests: SwapRequest[] = [
    { id: 1, space: 'Cubicle', date: '12', sender: 'user' },
    { id: 2, space: 'Cubicle', date: '12', sender: 'user' },
  ];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookingDetails();
    this.fetchSwapRequests();
  }

  fetchBookingDetails(): void {
    // Call your booking service to fetch booking details
    this.bookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  fetchSwapRequests(): void {
    // Call your booking service to fetch swap requests
    this.bookingService.getSwapRequests().subscribe((swapRequests) => {
      this.swapRequests = swapRequests;
    });
  }

  cancelBooking(booking: Booking): void {
    // Call your booking service to cancel the booking
    this.bookingService.cancelBooking(booking.id).subscribe(() => {
      // Update the status of the booking in the UI to "Cancellation Pending"
      booking.status = 'Cancellation Pending';
    });
  }

  acceptSwapRequest(swapRequest: SwapRequest): void {
    // Call your booking service to accept the swap request
    this.bookingService.acceptSwapRequest(swapRequest.id).subscribe(() => {
      // Update the UI or remove the swap request card, etc.
    });
  }

  rejectSwapRequest(swapRequest: SwapRequest): void {
    // Call your booking service to reject the swap request
    this.bookingService.rejectSwapRequest(swapRequest.id).subscribe(() => {
      // Update the UI or remove the swap request card, etc.
    });
  }
}
