import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatisticService } from '../statistic.service';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <article class="details">
    <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}">
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" formControlName="firstName">
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" formControlName="lastName">
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email">
        <button class="primary" type="submit">Apply</button>
      </form>
    </section>
  </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  messageService: MessageService = inject(MessageService);

  housingService: HousingService = inject(HousingService);
  statisticsService: StatisticService = inject(StatisticService);
  applicationService: ApplicationService = inject(ApplicationService);

  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  constructor() {
    this.housingService.getHousingLocationById(Number(this.route.snapshot.paramMap.get('id')))
      .then((data) => {
        this.housingLocation = data
        this.statisticsService.registerDetailView(data?.id);
      });
  }

  submitApplication() {
    var application = this.applyForm.value as Application;
    application.housingLocationId = this.housingLocation?.id ?? -1;
    if(!this.validate(application)) {
      this.messageService.setErrorMessage('Some required fields are missing');
      return;
    }
    try {
      this.applicationService.submitApplication(application );
      this.router.navigate(['/confirmation'], { state: { application } });
    } catch (error) {
      this.router.navigate(['/error']);
    }
  }
  private validate(application: Application): boolean {
   return !!(application.firstName && application.lastName && application.email);
  }
}