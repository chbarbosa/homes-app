import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-general-error-message',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="error-container">
      <div class="error-content">
        <h1>Oops!</h1>
        <h2>Something unexpected happened</h2>
        <p>We apologize for the inconvenience. Please try again later.</p>
        <button class="primary" routerLink="/">Return to Home</button>
      </div>
    </div>
  `,
  styleUrl: './general-error-message.component.css'
})
export class GeneralErrorMessageComponent {
}
