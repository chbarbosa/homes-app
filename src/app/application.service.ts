import { Injectable } from '@angular/core';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly url_applications = "http://localhost:3000/applications";

  constructor() { }

  async listApplications(): Promise<[]> {
    const response = await fetch(this.url_applications);
    return await response.json() ?? [];
  }

  async updateApplication(application: Application): Promise<void> {
    try {
      const response = await fetch(`${this.url_applications}/${application.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      if (!response.ok) {
        throw new Error('Failed to update a new application');
      }
    } catch (error) {
      throw new Error('Failed to update application');
    }
  }

  private async registerApplication(application: Application): Promise<void> {
    try {
      const response = await fetch(this.url_applications, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      if (!response.ok) {
        throw new Error('Failed to register a new application');
      }
    } catch (error) {
      throw new Error('Failed to submit application');
    }
  }

  submitApplication(application: Application): void {
    if (!this.validateApplication(application)) {
      throw new Error('Missing required fields');
    }
    this.registerApplication(application).then(() => {
      console.log(`Application submitted for ${application.housingLocationId} from ${application.firstName} ${application.lastName} at ${application.email}`);
    });
  }

  private validateApplication(application: Application): boolean {
    return application && application.firstName !== '' && application.lastName !== '' && application.email !== '' && application.housingLocationId !== null && application.housingLocationId >= 0;
  }
}
