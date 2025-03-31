import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { StatisticService } from '../statistic.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HousingLocationComponent], // Add FormsModule to imports
  template: `
    <section>
      <form (submit)="filterResults(); $event.preventDefault()">
        <input type="text" placeholder="Filter by city" [(ngModel)]="filterText" name="filterText" >
        <button class="primary" type="button" (click)="filterResults()" [disabled]="filterText.length < 3" >Search</button>
        <button class="primary" type="button" (click)="cleanResults()">Clean</button>
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
  private housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  statisticService: StatisticService = inject(StatisticService);
  messageService: MessageService = inject(MessageService);
  filteredLocationList: HousingLocation[] = [];
  filterText: string = '';

  constructor () {
    this.housingService.getHousingLocations().then((data) => {
      this.housingLocationList = data;
      this.filteredLocationList = data;
    }).catch((error) => {
      console.log("error", error);
      this.messageService.setErrorMessage('Failed to load housing locations. Please try again later.');
    });
  }
  filterResults() {
    this.messageService.cleanMessage()
    if(this.filterText.length > 2) {
      this.filteredLocationList =
      this.housingLocationList.filter((hl) => hl?.city.toLowerCase().includes(this.filterText.trim().toLowerCase()));
      if(this.filteredLocationList.length === 0) {
        this.messageService.setInfoMessage('No results found');
      }
      this.statisticService.registerSearch(this.filterText);
      return;
    }
    this.filteredLocationList = this.housingLocationList;
  }
  cleanResults() {
    this.messageService.cleanMessage()
    this.filteredLocationList = this.housingLocationList;
    this.filterText = '';
  }
}
