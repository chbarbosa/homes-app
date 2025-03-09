import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private searchList: string[] = [];

  private detailList: number[] = [];

  constructor() { }

  registerSearch(mot: string) {
    this.searchList.push(mot);
  }

  registerDetailView(idDetail: number) {
    this.detailList.push(idDetail);
  }

  countSearches(): number {
    return this.searchList.length;
  }

  countDetailViews(): number {
    return this.detailList.length;
  }
}
