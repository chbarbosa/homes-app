import { Injectable } from '@angular/core';
import { Application } from './application';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private readonly url_locations = "http://localhost:3000/locations";

  constructor() { }

  async getHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url_locations);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation> {
    const data = await fetch(`${this.url_locations}/${id}`);
    return await data.json() ?? {};
  }
}
