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
      console.error('Error registering application:', error);
    }
  }

  submitApplication(application: Application): void {
    if (!this.validateApplication(application)) {
      // TODO: Add better error handling, show a message to the user
      console.error('Missing required fields');
      return;
    }
    this.registerApplication(application).then(() => {
      console.log(`Application submitted for ${application.housingLocationId} from ${application.firstName} ${application.lastName} at ${application.email}`);
    });
  }

  private validateApplication(application: Application): boolean {
    return application && application.firstName !== '' && application.lastName !== '' && application.email !== '' && application.housingLocationId !== null && application.housingLocationId >= 0;
  }
}
