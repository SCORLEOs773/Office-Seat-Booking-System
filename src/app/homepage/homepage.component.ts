import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  officeSpaces: any[] = [
    {
      title: 'Shared Workspaces',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur lacus a metus maximus, ut malesuada urna condimentum. Donec rutrum pretium tortor, at laoreet sem scelerisque vel.',
      imageUrl: 'assets/shared-workspace.jpg',
    },
    {
      title: 'Private Offices',
      description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce id justo ac ipsum fermentum lobortis. Nulla facilisi. Sed euismod venenatis purus, et pellentesque quam ultrices sit amet.',
      imageUrl: 'assets/private-office.jpg',
    },
    {
      title: 'Meeting Rooms',
      description:
        'Curabitur sodales, eros sed fermentum finibus, nunc libero feugiat magna, ac pharetra libero sapien ut lectus. Phasellus sagittis arcu non feugiat bibendum. Nullam auctor mi et pharetra dapibus.',
      imageUrl: 'assets/meeting-room.jpg',
    },
  ];
}
