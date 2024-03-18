import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviorment';

export interface OfficeBuilding {
  buildingId: number;
  buildingName: string;
  floors: Floor[];
}

export interface Floor {
  floorId: number;
  floorName: string;
  spaces: {
    [key: string]: Space[];
  };
}

export interface Space {
  seatId?: number;
  cubicleId?: number;
  roomId?: number;
  bookingId?: number;
  name: string;
  status: string;
  booked?: boolean;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  showSwapButton?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getOfficeBuildings(): Observable<OfficeBuilding[]> {
    return this.http.get<OfficeBuilding[]>('/offices');
  }

  // Method to book a space
  bookSpace(spaceId: number): Observable<any> {
    // Assuming you have an API endpoint for booking a space
    return this.http.post<any>(`/api/bookings/book/${spaceId}`, {});
  }

  // Method to send a swap request
  sendSwapRequest(request: any): Observable<any> {
    // Assuming you have an API endpoint for sending a swap request
    return this.http.post<any>(`/api/bookings/swap`, request);
  }

  // Method to retrieve bookings
  getBookings(): Observable<any> {
    // Assuming you have an API endpoint to fetch bookings
    return this.http.get<any>('/api/bookings');
  }

  // Method to retrieve swap requests
  getSwapRequests(): Observable<any> {
    // Assuming you have an API endpoint to fetch swap requests
    return this.http.get<any>('/api/swap-requests');
  }

  // Method to cancel a booking
  cancelBooking(bookingId: number): Observable<any> {
    // Assuming you have an API endpoint to cancel a booking
    return this.http.delete<any>(`/api/bookings/${bookingId}`);
  }

  // Method to accept a swap request
  acceptSwapRequest(requestId: number): Observable<any> {
    // Assuming you have an API endpoint to accept a swap request
    return this.http.put<any>(`/api/swap-requests/${requestId}/accept`, {});
  }

  // Method to reject a swap request
  rejectSwapRequest(requestId: number): Observable<any> {
    // Assuming you have an API endpoint to reject a swap request
    return this.http.put<any>(`/api/swap-requests/${requestId}/reject`, {});
  }

  getBookedSpacesInRange(
    startDateTime: Date,
    endDateTime: Date
  ): Observable<Space[]> {
    // Adjust the URL and payload according to your backend API
    const url = this.apiUrl;
    const payload = {
      startDateTime: startDateTime.toISOString(), // Convert to ISO string or adjust format as needed
      endDateTime: endDateTime.toISOString(), // Convert to ISO string or adjust format as needed
    };
    return this.http.post<Space[]>(url, payload);
  }

  searchAvailableSpaces(
    startDateTime: Date,
    endDateTime: Date
  ): Observable<Space[]> {
    // Check if startDateTime and endDateTime are valid Date objects
    if (!(startDateTime instanceof Date) || isNaN(startDateTime.getTime())) {
      throw new Error('Invalid startDateTime value');
    }
    if (!(endDateTime instanceof Date) || isNaN(endDateTime.getTime())) {
      throw new Error('Invalid endDateTime value');
    }

    // Adjust the URL and payload according to your backend API
    const url = `${this.apiUrl}/searchAvailableSpaces`;
    const payload = {
      startDateTime: startDateTime.toISOString(), // Convert to ISO string or adjust format as needed
      endDateTime: endDateTime.toISOString(), // Convert to ISO string or adjust format as needed
    };
    return this.http.post<Space[]>(url, payload);
  }
}
