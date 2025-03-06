import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="errors" *ngIf="errorMessage">
      {{ errorMessage }}
    </section>
    <section class="results">
      <app-housing-location *ngFor="let hl of filteredLocationList" [housingLocation]="hl"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // from https://gist.githubusercontent.com/MarkTechson/efe8a9d4727ef33949b78812e66db082/raw/2eb2802c55e80bd5cb1c14fa5c322150bb3852dc/listing%2520data
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  errorMessage: string | null = null;

  constructor () {
    this.housingService.getHousingLocations().then((data) => {
      console.log("getHousingLocations");
      this.housingLocationList = data;
      this.filteredLocationList = data;
    }).catch((error) => {
      console.log("error", error);
      this.errorMessage = 'Failed to load housing locations. Please try again later.';
    });
  }
  filterResults(text: string) {
    if(!text) this.filteredLocationList = this.housingLocationList;
    this.filteredLocationList =
    this.housingLocationList.filter((hl) => hl?.city.toLowerCase().includes(text.toLowerCase()));
  }
}
