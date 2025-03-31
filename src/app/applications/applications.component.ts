import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { MessageService } from '../message.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

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
            <div *ngIf="!application.status">
              <button class="primary" (click)="onConfirm(application)">confirm</button>
              <button class="primary" (click)="onCancel(application)">cancel</button>
            </div>
            <span *ngIf="application.status">{{application.status}}</span>
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
  messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.applicaitonService.listApplications().then(data => { 
      this.applications = data;
    });
  }

  onConfirm(application: any) {
    application.status = 'confirmed';
    this.applicaitonService.updateApplication(application).then(() => {
      console.log('Application confirmed');
    }
    ).catch((error: any) => {
      this.handleError(error);
    }
    );
  }

  onCancel(application: any) {
    application.status = 'canceled';
    this.applicaitonService.updateApplication(application).then(() => {
      console.log('Application canceled');
    }
    ).catch((error: any) => {
      this.handleError(error);
    }
    );
  }

  private handleError(error: any) {
    console.error(error);
    this.messageService.setErrorMessage(error.message);
  }
}
