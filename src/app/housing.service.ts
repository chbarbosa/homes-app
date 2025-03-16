import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { Observable, of } from 'rxjs';
import { Application } from './application';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private url_locations = "http://localhost:3000/locations";
  private url_applications = "http://localhost:3000/applications";

  constructor() { }

  async getHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url_locations);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const data = await fetch(`${this.url_locations}/${id}`);
    return await data.json() ?? {};
  }


  //TODO: create and move to application.service.ts

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

  async listApplications(): Promise<[]> {
    const response = await fetch(this.url_applications);
    return await response.json() ?? [];
  }

  async registerApplication(application: Application): Promise<void> {
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
}
