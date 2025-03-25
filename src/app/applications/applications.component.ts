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
            <button class="primary" (click)="onConfirm(application)">confirm</button>
            <button class="primary" (click)="onCancel(application)">cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrl: './applications.component.css'
})
//TODO: add status for confirmation, add treatments for confirm and cancel and don't show the buttons when there is a decision.
export class ApplicationsComponent {
  applications : Application[] = [];
  applicaitonService: ApplicationService = inject(ApplicationService);

  ngOnInit() {
    this.applicaitonService.listApplications().then(data => { 
      console.log(data);
      this.applications = data;
    });
  }

  onConfirm(application: any) {
    // Implement edit functionality
  }

  onCancel(application: any) {
    // Implement delete functionality
  }
}
