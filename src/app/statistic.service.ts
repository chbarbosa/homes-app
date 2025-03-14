import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private url_statistics = "http://localhost:3000";

  constructor() { }

  async registerSearch(searchText: string): Promise<void> {
    try {
      const response = await fetch(`${this.url_statistics}/searches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchText, timestamp: new Date().toISOString() })
      });
      if (!response.ok) {
        throw new Error('Failed to register search');
      }
    } catch (error) {
      console.error('Error registering search:', error);
    }
  }

  async registerDetailView(idDetail: number): Promise<void> {
    try {
      const response = await fetch(`${this.url_statistics}/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idDetail, timestamp: new Date().toISOString() })
      });
      if (!response.ok) {
        throw new Error('Failed to register detail view');
      }
    } catch (error) {
      console.error('Error registering detail view:', error);
    }
  }

  async countSearches(): Promise<number> {
    try {
      const response = await fetch(`${this.url_statistics}/searches`);
      const data = await response.json();
      return data.length;
    } catch (error) {
      console.error('Error counting searches:', error);
      return 0;
    }
  }

  async countDetailViews(): Promise<number> {
    try {
      const response = await fetch(`${this.url_statistics}/details`);
      const data = await response.json();
      return data.length;
    } catch (error) {
      console.error('Error counting detail views:', error);
      return 0;
    }
  }
}
