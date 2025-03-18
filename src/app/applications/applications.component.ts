import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table>
      <thead>
        <tr>
          <th>Location ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let application of applications">
          <td>{{ application.housingLocationId }}</td>
          <td>{{ application.firstName }}</td>
          <td>{{ application.lastName }}</td>
          <td>
            <button class="primary" (click)="onEdit(application)">Edit</button>
            <button class="primary" (click)="onDelete(application)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  applications : Application[] = [];
  applicaitonService: ApplicationService = inject(ApplicationService);

  ngOnInit() {
    this.applicaitonService.listApplications().then(data => { 
      console.log(data);
      this.applications = data;
    });
  }

  onEdit(application: any) {
    // Implement edit functionality
  }

  onDelete(application: any) {
    // Implement delete functionality
  }
}
