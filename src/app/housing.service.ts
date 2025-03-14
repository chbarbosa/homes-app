import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private url_locations = "http://localhost:3000/locations";

  constructor() { }

  async getHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url_locations);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const data = await fetch(`${this.url_locations}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string, housingLocationId: number): void {
    if (!firstName || !lastName || !email || !housingLocationId || housingLocationId < 0) {
      console.error('Missing required fields');
      return;
    }
    console.log(`Application submitted for ${housingLocationId} from ${firstName} ${lastName} at ${email}`);
  }

  async listApplications(): Promise<[]> {
    const response = await fetch(`${this.url_locations}/applications`);
    return await response.json() ?? [];
  }
}
