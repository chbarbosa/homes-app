import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicationsconfirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="confirmation">
      <h2>Thank you for your application!</h2>
      <section class="details" *ngIf="application">
        <p>Dear {{application.firstName}} {{application.lastName}},</p>
        <p>Your application has been received and we will contact you at <strong>{{application.email}}</strong> regarding next steps.</p>
      </section>
    </article>
  `,
  styleUrls: ['./applicationsconfirmation.component.css']
})
export class ApplicationsconfirmationComponent {
  application: any;
  houseName: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { application: any };
    
    if (state && state.application) {
      this.application = state.application;
      this.houseName = state.application.houseName || 'Not specified';
    } else {
      // Redirect to home if no application data
      this.router.navigate(['/error']);
    }
  }
}
