import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingService } from './booking.service';

interface OfficeBuilding {
  buildingId: number;
  buildingName: string;
  floors: Floor[];
}

interface Floor {
  floorId: number;
  floorName: string;
  spaces: {
    [key: string]: Space[];
  };
}

interface Space {
  seatId?: number;
  cubicleId?: number;
  roomId?: number;
  bookingId?: number;
  name: string;
  status: string;
  capacity?: number;
  booked?: boolean; // New property to track booking status
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  bookingForm: FormGroup;
  officeBuildings: OfficeBuilding[] = [];
  showSpaces = false;
  availableSpaces: Space[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.formBuilder.group({
      officeBuilding: [''],
      floor: [''],
      spaceType: [''],
    });

    // Initialize office buildings
    this.initializeOfficeBuildings();
  }

  initializeOfficeBuildings() {
    const jsonData = {
      officeBuildings: [
        {
          buildingId: 1,
          buildingName: 'MIS HQ',
          floors: [
            {
              floorId: 1,
              floorName: 'Floor 1',
              spaces: {
                officeSeats: [
                  { seatId: 1, name: 'Seat 1', status: 'Available' },
                  { seatId: 2, name: 'Seat 2', status: 'Occupied' },
                ],
                cubicles: [
                  { cubicleId: 1, name: 'Cubicle 1', status: 'Occupied' },
                  { cubicleId: 2, name: 'Cubicle 2', status: 'Available' },
                ],
              },
            },
            {
              floorId: 2,
              floorName: 'Floor 2',
              spaces: {
                officeSeats: [
                  { seatId: 1, name: 'Seat 1', status: 'Available' },
                  { seatId: 2, name: 'Seat 2', status: 'Occupied' },
                ],
                cubicles: [
                  { cubicleId: 1, name: 'Cubicle 1', status: 'Occupied' },
                  { cubicleId: 2, name: 'Cubicle 2', status: 'Available' },
                ],
              },
            },
          ],
        },
      ],
    };

    this.officeBuildings = jsonData.officeBuildings;
  }

  onBuildingChange(buildingId: number) {
    const selectedBuilding = this.officeBuildings.find(
      (b) => b.buildingId === +buildingId
    );
    this.bookingForm.get('floor')?.setValue('');
    this.bookingForm.get('spaceType')?.setValue('');
    if (selectedBuilding) {
      this.bookingForm.get('floor')?.enable();
    } else {
      this.bookingForm.get('floor')?.disable();
    }
  }

  onFloorChange(floorId: number) {
    const selectedBuildingId = this.bookingForm.get('officeBuilding')?.value;
    const selectedBuilding = this.officeBuildings.find(
      (b) => b.buildingId === +selectedBuildingId
    );
    if (selectedBuilding) {
      const selectedFloor = selectedBuilding.floors.find(
        (f) => f.floorId === +floorId
      );
      if (selectedFloor) {
        const spaceTypes = Object.keys(selectedFloor.spaces);
        this.bookingForm.get('spaceType')?.setValue('');
        if (spaceTypes.length > 0) {
          this.bookingForm.get('spaceType')?.enable();
        } else {
          this.bookingForm.get('spaceType')?.disable();
        }
      }
    }
  }

  searchSpaces() {
    const selectedBuildingId = this.bookingForm.get('officeBuilding')?.value;
    const selectedBuilding = this.officeBuildings.find(
      (b) => b.buildingId === +selectedBuildingId
    );
    if (selectedBuilding) {
      const selectedFloorId = this.bookingForm.get('floor')?.value;
      const selectedFloor = selectedBuilding.floors.find(
        (f) => f.floorId === +selectedFloorId
      );
      if (selectedFloor) {
        const selectedSpaceType = this.bookingForm.get('spaceType')?.value;
        if (selectedSpaceType) {
          this.availableSpaces = selectedFloor.spaces[selectedSpaceType];
          this.showSpaces = true;
        }
      }
    }
  }

  bookSpace(space: Space) {
    // Logic to book the selected space
    this.bookingService
      .bookSpace(space.seatId || space.cubicleId || space.roomId)
      .subscribe(
        () => {
          // Handle success, e.g., show a success message
          console.log('Booking request sent successfully');
          space.status = 'Booked';
          // space.booked = true;
        },
        (error) => {
          // Handle error, e.g., show an error mesxsage
          console.error('Error booking space:', error);
        }
      );
    space.booked = true;
  }
  swapSpace(space: Space) {
    // Logic to swap the selected space with another space
    // Assuming you have a form or mechanism to gather swap details
    const swapRequest = {
      spaceId: space.seatId || space.cubicleId || space.roomId,
      // Add other swap details here, e.g., userId, targetSpaceId, etc.
    };

    // Assuming the sendSwapRequest method expects a request object
    this.bookingService.sendSwapRequest(swapRequest).subscribe(
      () => {
        // Handle success, e.g., show a success message
        console.log('Swap request sent successfully');
      },
      (error) => {
        // Handle error, e.g., show an error message
        console.error('Error sending swap request:', error);
      }
    );
  }

  getSelectedBuilding() {
    const selectedBuildingId = this.bookingForm.get('officeBuilding')?.value;
    return this.officeBuildings.find(
      (b) => b.buildingId === +selectedBuildingId
    );
  }

  getSelectedFloor() {
    const selectedBuildingId = this.bookingForm.get('officeBuilding')?.value;
    const selectedBuilding = this.officeBuildings.find(
      (b) => b.buildingId === +selectedBuildingId
    );
    const selectedFloorId = this.bookingForm.get('floor')?.value;
    return selectedBuilding?.floors.find((f) => f.floorId === +selectedFloorId);
  }
}
