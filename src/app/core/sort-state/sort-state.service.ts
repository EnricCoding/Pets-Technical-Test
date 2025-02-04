import { Injectable } from '@angular/core';

interface SortState {
  sortKey?: string;
  isAscending: boolean;
  currentPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class SortStateService {
  private state: SortState = {
    sortKey: undefined,
    isAscending: true,
    currentPage: 1,
  };

  getState(): SortState {
    return { ...this.state }; 
  }

  setState(newState: Partial<typeof this.state>): void {
    this.state = { ...this.state, ...newState };
  }
}
