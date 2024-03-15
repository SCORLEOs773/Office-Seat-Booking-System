import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  officeBuildings: any[]; // Assuming this will be fetched from backend
  floors: any[]; // Assuming this will be fetched from backend
  showSpaces: boolean = false;
  availableSeats: any[] = [];
  seatNames: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      officeBuilding: ['', Validators.required],
      floor: ['', Validators.required],
      spaceType: ['', Validators.required],
    });

    // Fetch office building and floor data from backend
    this.fetchOfficeBuildings();
    this.fetchFloors();
  }

  fetchOfficeBuildings() {
    // Call your backend API to fetch office building data
    // Example: this.http.get('/api/office-buildings').subscribe((data: any[]) => {
    //   this.officeBuildings = data;
    // });
    // Mock data
    this.officeBuildings = [
      { id: 1, name: 'MIS HQ' },
      { id: 2, name: 'MIS Tech Hub' },
    ];
  }

  fetchFloors() {
    // Call your backend API to fetch floor data
    // Example: this.http.get('/api/floors').subscribe((data: any[]) => {
    //   this.floors = data;
    // });
    // Mock data
    this.floors = [
      { id: 1, name: 'Floor 1' },
      { id: 2, name: 'Floor 2' },
      { id: 3, name: 'Floor 3' },
    ];
  }

  onBuildingChange() {
    // Implement logic to fetch floors based on selected office building
  }

  searchSpaces() {
    if (this.bookingForm.valid) {
      // Call your backend API to search for available spaces based on form inputs
      // Example: this.http.post('/api/search-spaces', this.bookingForm.value).subscribe((data: any[]) => {
      //   this.availableSeats = data;
      //   this.generateSeatNames();
      //   this.showSpaces = true;
      // });
      // Mock data
      this.availableSeats = [
        { id: 1, status: 'Available' },
        { id: 2, status: 'Occupied' },
        { id: 3, status: 'Available' },
      ];
      this.generateSeatNames();
      this.showSpaces = true; // Display available spaces
    } else {
      console.log('Invalid form');
    }
  }

  generateSeatNames() {
    const spaceType = this.bookingForm.value.spaceType;
    if (spaceType === 'officeSeats') {
      this.seatNames = ['Seat 1', 'Seat 2', 'Seat 3']; // Generate seat names for office seats
    } else if (spaceType === 'cubicles') {
      this.seatNames = ['Cubicle A1', 'Cubicle A2', 'Cubicle A3']; // Generate seat names for cubicles
    } else if (spaceType === 'meetingRooms') {
      this.seatNames = ['Henry Ford', 'Nikola Tesla', 'Thomas Edison']; // Generate meeting room names
    }
  }

  bookSeat(seatId: number) {
    // Implement logic to handle booking the selected seat
    console.log('Booked seat:', seatId);
    // Example: this.http.post('/api/book-seat', seatId).subscribe(response => {
    //   console.log('Seat booked successfully:', response);
    // });
  }

  isSeatAvailable(seat: any): boolean {
    return seat.status === 'Available';
  }
}
