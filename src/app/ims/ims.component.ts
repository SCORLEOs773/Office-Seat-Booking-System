import { Component, OnInit } from '@angular/core';
import { IMSService } from './ims.service';

interface Floor {
  numSeats: number;
  seatType: string;
}

@Component({
  selector: 'app-ims',
  templateUrl: './ims.component.html',
  styleUrls: ['./ims.component.css'],
})
export class IMSComponent implements OnInit {
  officeName: string = '';
  numFloors: number;
  floors: Floor[] = [];
  officeCreated: boolean = false;
  officeId: string;

  constructor(private imsService: IMSService) {}

  ngOnInit(): void {}

  createOffice() {
    this.imsService.createOffice(this.officeName).subscribe(
      (response) => {
        console.log('Office created successfully:', response);
        this.officeId = response.officeId;
        this.officeCreated = true;
      },
      (error) => {
        console.error('Error creating office:', error);
        // Handle error appropriately
      }
    );
  }

  addFloors() {
    this.floors = [];
    for (let i = 0; i < this.numFloors; i++) {
      this.floors.push({ numSeats: 0, seatType: 'Seats' });
    }
  }

  submitData() {
    this.imsService.submitFloorData(this.officeId, this.floors).subscribe(
      (response) => {
        console.log('Floor data submitted successfully:', response);
        // Reset form data
        this.numFloors = null;
        this.floors = [];
        this.officeCreated = false;
      },
      (error) => {
        console.error('Error submitting floor data:', error);
        // Handle error appropriately
      }
    );
  }
}
