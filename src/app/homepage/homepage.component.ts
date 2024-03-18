import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  typewriterContent: string;
  officeSpaces: any[] = [
    {
      title: 'Shared Workspaces',
      description:
        'Shared workspaces provide a collaborative environment for professionals from diverse backgrounds to work together, share ideas, and foster creativity. Equipped with modern amenities and flexible arrangements, these spaces promote productivity and innovation.',
      imageUrl:
        'https://ownr-blog.com/wp-content/uploads/2020/08/coworking-shared-office-space.jpg',
    },
    {
      title: 'Private Offices',
      description:
        'Private offices offer individuals or teams a dedicated space to work without distractions. With customizable layouts and exclusive access, these offices provide privacy and focus, ideal for meetings, client calls, and focused work sessions.',
      imageUrl:
        'https://img.freepik.com/premium-photo/interior-empty-office-with-glass-partitions-loft-style-view-city-park_124507-32995.jpg',
    },
    {
      title: 'Meeting Rooms',
      description:
        'Meeting rooms are designed to facilitate productive discussions, presentations, and brainstorming sessions. Equipped with essential amenities and technology, these rooms offer a professional setting for conducting meetings and collaborations.',
      imageUrl:
        'https://e1.pxfuel.com/desktop-wallpaper/893/743/desktop-wallpaper-office-conference-room-meeting-room.jpg',
    },
  ];

  addGradientBorder(space: any) {
    space.isHovered = true;
  }

  removeGradientBorder(space: any) {
    space.isHovered = false;
  }

  constructor() {}

  ngOnInit(): void {
    this.typewriterContent =
      'Explore the different office space booking options available to suit your needs.';

    let index = 0;
    setInterval(() => {
      const lines = [
        'Find the perfect workspace for your tasks and projects.',
        'Book meeting rooms for productive discussions and presentations.',
        'Explore the different office space booking options available to suit your needs.',
      ];

      const nextLine = lines[index];
      index = (index + 1) % lines.length;
      this.typewriterContent = '';
      this.typewriter(nextLine, 50);
    }, 6000);
  }

  typewriter(text: string, delay: number) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        this.typewriterContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, delay);
  }
}
