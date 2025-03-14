import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { StatisticService } from '../statistic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit)="filterResults(filter.value); $event.preventDefault()">
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
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
  statisticService: StatisticService = inject(StatisticService);
  filteredLocationList: HousingLocation[] = [];

  constructor () {
    this.housingService.getHousingLocations().then((data) => {
      this.housingLocationList = data;
      this.filteredLocationList = data;
    });
  }
  filterResults(text: string) {
    if(!text) this.filteredLocationList = this.housingLocationList;
    this.filteredLocationList =
    this.housingLocationList.filter((hl) => hl?.city.toLowerCase().includes(text.toLowerCase()));
    this.statisticService.registerSearch(text);
  }
}
