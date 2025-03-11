import { Component, inject } from '@angular/core';
import { StatisticService } from '../statistic.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  template: `
  <article class="admin">
    <h1 class="admin-heading">Admin Page</h1>
    <p class="admin-description">This is the admin page. It is only accessible to administrators.</p>
    <section class="admin-data">
      <p>Number of searches: {{searchesNumber}}</p>
      <p>Number of detail views: {{detailViewsNumber}}</p>
    </section>
  </article>
  `,
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  statisticsService: StatisticService = inject(StatisticService);
  searchesNumber: number | undefined;
  detailViewsNumber: number | undefined;
  AdminComponent() {
    this.statisticsService.countSearches().then((data) => {
      this.searchesNumber = data;
    });
    this.statisticsService.countDetailViews().then((data) => {
      this.detailViewsNumber = data;
    });
  }

}
