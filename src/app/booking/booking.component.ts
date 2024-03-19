import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BookingService,
  Floor,
  OfficeBuilding,
  Space,
} from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  officeNames: OfficeBuilding[] = [];
  selectedOfficeBuilding: OfficeBuilding | null = null;
  floors: Floor[] = [];
  seats: Space[] = [];
  showSpaces = false;
  availableSpaces: Space[] = [];
  startDate: Date = new Date();
  startTime: string = '';
  duration: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) {
    this.selectedOfficeBuilding = null;
    this.bookingForm = this.formBuilder.group({
      officeBuilding: ['', Validators.required],
      floor: ['', Validators.required],
      spaceType: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchOfficeBuildings();
  }

  fetchOfficeBuildings() {
    this.bookingService.getOfficeBuildings().subscribe((response: any) => {
      this.officeNames = response.data.map((item: any) => ({
        officeId: item.officeId,
        officeName: item.officeName,
      }));
      // console.log(this.officeNames);
    });
  }

  onBuildingChange(officeId: number) {
    this.bookingService
      .getFloorsForOffice(officeId)
      .subscribe((floors: any) => {
        console.log('Floors response:', floors);
        // Update the floors in the selected office building
        this.floors = floors.data
          .map((floor: any) => ({
            floorId: floor.floorId,
            floorNumber: floor.floorNumber,
          }))
          .sort((a: any, b: any) => a.floorNumber - b.floorNumber);
      });
  }

  onFloorChange(floorId: number) {
    this.bookingService.getSeatsForFloor(floorId).subscribe((seats: any) => {
      console.log('Seats response:', seats);
      // Logic to handle seats data
      this.seats = seats.data.map((seat: any) => ({
        seatId: seat.seatId,
        number: seat.seatNumber,
        booked: seat.seatBooked,
        type: seat.seatType,
      }));
    });
  }

  searchSpaces() {
    const selectedFloorId = this.bookingForm.get('floor')?.value;
    const selectedSpaceType = this.bookingForm.get('spaceType')?.value;

    if (selectedFloorId) {
      this.bookingService
        .getSeatsForFloor(selectedFloorId)
        .subscribe((seats: any) => {
          console.log('Seats response:', seats);

          if (selectedSpaceType === 'ALL') {
            // If "ALL" is selected, display all seats
            this.availableSpaces = seats.data.map((seat: any) => ({
              name: seat.seatNumber,
              type: seat.seatType, // Add the seat type here
              status: seat.seatBooked ? 'Booked' : 'Available',
              booked: seat.seatBooked,
              // Add other properties as needed
            }));
          } else {
            // Filter seats based on the selected space type
            const filteredSeats = seats.data.filter(
              (seat: any) => seat.seatType === selectedSpaceType
            );
            // Update the availableSpaces array with the filtered seat data
            this.availableSpaces = filteredSeats.map((seat: any) => ({
              name: seat.seatNumber,
              type: seat.seatType, // Add the seat type here
              status: seat.seatBooked ? 'Booked' : 'Available',
              booked: seat.seatBooked,
              // Add other properties as needed
            }));
          }

          // Set showSpaces to true to display the available spaces section
          this.showSpaces = true;
        });
    } else {
      // If no floor is selected, display an error message or handle it accordingly
      console.error('No floor selected');
    }
  }

  bookSpace(space: Space) {
    // Logic for booking space
  }

  swapSpace(space: Space) {
    // Logic for swapping space
  }

  resetForm() {
    // Logic for resetting form
  }

  getSelectedBuilding() {
    // Logic for getting selected building
  }

  getSelectedFloor() {
    // Logic for getting selected floor
  }
}
