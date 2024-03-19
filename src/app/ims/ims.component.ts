// ims.component.ts
import { Component, OnInit } from '@angular/core';
import { IMSService } from './ims.service';

interface Floor {
  floorNumber: string;
  seats: Seat[];
}

interface Seat {
  seatNumber: string;
  seatType: string;
}

@Component({
  selector: 'app-ims',
  templateUrl: './ims.component.html',
  styleUrls: ['./ims.component.css'],
})
export class IMSComponent implements OnInit {
  officeName: string = '';
  floorNumber: string = '';
  numSeats: number;
  floors: Floor[] = [];
  officeCreated: boolean = false;
  officeId: string;

  constructor(private imsService: IMSService) {}

  ngOnInit(): void {}

  createOffice() {
    this.imsService.createOffice(this.officeName).subscribe(
      (response) => {
        console.log('Office created successfully:', response);
        if (response && response.office && response.office.officeId) {
          localStorage.setItem('officeId', response.office.officeId);
          this.officeId = response.office.officeId;
          this.officeCreated = true;
        } else {
          console.error('Error: Office ID not found in response.');
        }
      },
      (error) => {
        console.error('Error creating office:', error);
        // Handle error appropriately
      }
    );
  }

  addFloor() {
    if (this.floorNumber && this.numSeats) {
      // Check if both floor number and number of seats are provided
      this.imsService.createFloor(this.floorNumber, this.officeId).subscribe(
        (response) => {
          console.log('Floor created successfully:', response);
          localStorage.setItem('currentFloorId', response.Floor.floorId);
          console.log(response.floorId);
          const newFloor: Floor = {
            floorNumber: this.floorNumber,
            seats: [], // Initialize an empty array of seats
          };

          // Push the correct number of empty seats into the seats array
          for (let i = 0; i < this.numSeats; i++) {
            newFloor.seats.push({ seatNumber: '', seatType: 'Seats' });
          }

          this.floors.push(newFloor);
        },
        (error) => {
          console.error('Error creating floor:', error);
          // Handle error appropriately
        }
      );
    } else {
      console.error('Please enter both floor number and number of seats.');
    }
  }

  submitData() {
    const currentFloorId = localStorage.getItem('currentFloorId');
    console.log(currentFloorId);
    if (!currentFloorId) {
      console.error('Error: currentFloorId is undefined.');
      return;
    }

    // Prepare seatsData array
    const seats = this.floors.flatMap((floor) => {
      return floor.seats.map((seat) => {
        return {
          floor_id: currentFloorId,
          seat_number: seat.seatNumber,
          seat_type: seat.seatType.toUpperCase(),
        };
      });
    });

    this.imsService.submitSeatsData(currentFloorId, seats).subscribe(
      (response) => {
        console.log('Seats data submitted successfully:', response);
        // Reset form data
        this.floorNumber = '';
        this.floors = [];
        this.officeCreated = false;
      },
      (error) => {
        console.error('Error submitting seats data:', error);
        // Handle error appropriately
      }
    );
  }
}
