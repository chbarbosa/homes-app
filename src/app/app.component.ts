import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { MessageService } from './message.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header class="brand-name"><a routerLink="/"><img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true"></a></header>
      <section class="errors" *ngIf="errorMessage">
        {{ errorMessage }}
      </section>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  title = 'homes';
  errorMessage: string | null = null;

  messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.messageService.message.subscribe((message) => {
      this.errorMessage = message;
  });
}
}
