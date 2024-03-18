import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { Time, formatDate } from '@angular/common';

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

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  officeBuildings: OfficeBuilding[] = [];
  showSpaces = false;
  availableSpaces: Space[] = [];
  startDate: Date = new Date();
  startTime: string = '';
  duration: number = 1;

  ngOnInit(): void {
    // Fetch data from backend on component initialization
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend(): void {
    this.bookingService.getOfficeBuildings().subscribe((officeBuildings) => {
      this.officeBuildings = officeBuildings;
    });
    // Other data fetching logic can be similarly implemented
  }

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.formBuilder.group({
      officeBuilding: ['', Validators.required],
      floor: [{ value: '', disabled: true }, Validators.required],
      spaceType: [{ value: '', disabled: true }, Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', Validators.required],
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
                  {
                    seatId: 1,
                    name: 'Seat 1',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 2,
                    name: 'Seat 2',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 3,
                    name: 'Seat 3',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
                cubicles: [
                  {
                    cubicleId: 1,
                    name: 'Cubicle 1',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 2,
                    name: 'Cubicle 2',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 3,
                    name: 'Cubicle 3',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime:
                      'Sun Mar 17 2024 18:28:00 GMT+0530 (India Standard Time)',
                    endTime:
                      'Sun Mar 17 2024 19:28:00 GMT+0530 (India Standard Time)',
                  },
                ],
              },
            },
            {
              floorId: 2,
              floorName: 'Floor 2',
              spaces: {
                officeSeats: [
                  {
                    seatId: 1,
                    name: 'Seat 1',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 2,
                    name: 'Seat 2',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
                cubicles: [
                  {
                    cubicleId: 1,
                    name: 'Cubicle 1',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 2,
                    name: 'Cubicle 2',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 3,
                    name: 'Cubicle 3',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
              },
            },
          ],
        },
        {
          buildingId: 2,
          buildingName: 'Tech Hub',
          floors: [
            {
              floorId: 1,
              floorName: 'Floor 1',
              spaces: {
                officeSeats: [
                  {
                    seatId: 1,
                    name: 'Seat 1',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 2,
                    name: 'Seat 2',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 3,
                    name: 'Seat 3',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
                cubicles: [
                  {
                    cubicleId: 1,
                    name: 'Cubicle 1',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 2,
                    name: 'Cubicle 2',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 3,
                    name: 'Cubicle 3',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
              },
            },
            {
              floorId: 2,
              floorName: 'Floor 2',
              spaces: {
                officeSeats: [
                  {
                    seatId: 1,
                    name: 'Seat 1',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 2,
                    name: 'Seat 2',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
                cubicles: [
                  {
                    cubicleId: 1,
                    name: 'Cubicle 1',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 2,
                    name: 'Cubicle 2',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 3,
                    name: 'Cubicle 3',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
              },
            },
            {
              floorId: 3,
              floorName: 'Floor 3',
              spaces: {
                officeSeats: [
                  {
                    seatId: 1,
                    name: 'Seat 1',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 2,
                    name: 'Seat 2',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 3,
                    name: 'Seat 3',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    seatId: 4,
                    name: 'Seat 4',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                ],
                cubicles: [
                  {
                    cubicleId: 1,
                    name: 'Cubicle 1',
                    status: 'Occupied',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 2,
                    name: 'Cubicle 2',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
                  {
                    cubicleId: 3,
                    name: 'Cubicle 3',
                    status: 'Available',
                    bookingDate: new Date(),
                    startTime: '',
                    endTime: '',
                  },
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

  resetForm() {
    this.bookingForm.reset();
    this.showSpaces = false;
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
    const selectedDate = this.bookingForm.get('startDate')?.value;
    const selectedTime = this.bookingForm.get('startTime')?.value;

    // Combine date and time into a single string in ISO format
    const startDateTimeString = selectedDate + 'T' + selectedTime + ':00';

    const startDateTime = new Date(startDateTimeString); // Convert to Date object

    const duration = this.bookingForm.get('duration')?.value;

    const endDateTime = new Date(
      startDateTime.getTime() + duration * 60 * 60 * 1000
    ); // Calculate end time based on duration

    console.log(startDateTime);
    console.log(endDateTime);

    this.bookingService
      .getBookedSpacesInRange(startDateTime, endDateTime)
      .subscribe((bookedSpaces: Space[]) => {
        // Filter out booked spaces from availableSpaces
        this.availableSpaces = this.availableSpaces.filter(
          (space) =>
            !bookedSpaces.some(
              (bookedSpace) => bookedSpace.seatId === space.seatId
            )
        );

        this.availableSpaces.forEach((space) => {
          const matchingBookedSpace = bookedSpaces.find(
            (bookedSpace) => bookedSpace.seatId === space.seatId
          );
          if (matchingBookedSpace) {
            space.showSwapButton = true;
          }
        });

        this.showSpaces = true;
      });

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
      // Add , e.g., userId, targetSpaceId, etc.
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
