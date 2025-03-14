import { Component, inject } from '@angular/core';
import { StatisticService } from '../statistic.service';
import { ApplicationsComponent } from "../applications/applications.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ApplicationsComponent],
  template: `
  <article class="admin">
    <h1 class="admin-heading">Admin Page</h1>
    <p class="admin-description">This is the admin page. It is only accessible to administrators.</p>
    <section class="admin-data">
      <p>Number of searches: {{searchesNumber}}</p>
      <p>Number of detail views: {{detailViewsNumber}}</p>
      <p>Number of applications: {{applicationsNumber}}</p>
    </section>
    <app-applications></app-applications>
  </article>
  `,
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  statisticsService: StatisticService = inject(StatisticService);
  searchesNumber: number | undefined;
  detailViewsNumber: number | undefined;
  applicationsNumber: number | undefined;
  constructor () {
    this.statisticsService.countSearches().then((data) => {
      this.searchesNumber = data;
    });

    this.statisticsService.countDetailViews().then((data) => {
      this.detailViewsNumber = data;
    });

    this.statisticsService.countApplications().then((data) => {
      this.applicationsNumber = data;
    });
  }

}
