import { Component, OnInit } from '@angular/core';

interface Floor {
  id: string;
  name: string;
  numSeats: number;
  numCubicles: number;
}

@Component({
  selector: 'app-ims',
  templateUrl: './ims.component.html',
  styleUrls: ['./ims.component.css'],
})
export class IMSComponent implements OnInit {
  officeId: string = '';
  officeName: string = '';
  numFloors: number;
  floors: Floor[] = [];

  constructor() {}

  ngOnInit(): void {}

  addFloor() {
    const floorId = 'F' + (this.floors.length + 1);
    this.floors.push({ id: floorId, name: '', numSeats: 0, numCubicles: 0 });
  }

  submitData() {
    console.log('Office ID:', this.officeId);
    console.log('Office Name:', this.officeName);
    console.log('Number of Floors:', this.numFloors);
    console.log('Floors:', this.floors);
    // Additional logic to send data to backend can be added here
  }
}
