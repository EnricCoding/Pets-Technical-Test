import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { PetService } from '../../../../core/pet/pet.service';
import { Pet } from '../../../../models/pet/pet.model';
import { Router } from '@angular/router';
import { SortStateService } from '../../../../core/sort-state/sort-state.service';
import { SortOrder } from '../../../../enum/sortOrder/sort-order.enum';
import { Column } from '../../../../models/column/column.model';
import { AppRoutes } from '../../../../app-routing.module';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pet-list',
  standalone: false,
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  petOfTheDay: Pet | null = null;
  isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortKey?: string;
  isAscending: boolean = true;

  readonly columns: Column[] = [
    {
      key: 'photo_url',
      translationKey: 'petList.table.thumbnail',
      isImage: true,
    },
    { key: 'name', translationKey: 'petList.table.name' },
    { key: 'kind', translationKey: 'petList.table.kind' },
    { key: 'weight', translationKey: 'petList.table.weight' },
    { key: 'height', translationKey: 'petList.table.height' },
    { key: 'length', translationKey: 'petList.table.length' },
  ];

  readonly allowedSortKeys: string[] = [
    'weight',
    'length',
    'height',
    'name',
    'kind',
  ];

  constructor(
    private readonly petService: PetService,
    private readonly router: Router,
    private readonly sortStateService: SortStateService
  ) {}

  ngOnInit(): void {
    this.restoreState();
    this.fetchPets();
  }

  private restoreState(): void {
    const { sortKey, isAscending, currentPage } =
      this.sortStateService.getState();
    this.sortKey = sortKey;
    this.isAscending = isAscending;
    this.currentPage = currentPage;
  }

  private saveState(): void {
    this.sortStateService.setState({
      sortKey: this.sortKey,
      isAscending: this.isAscending,
      currentPage: this.currentPage,
    });
  }

  fetchPets(): void {
    this.isLoadingSubject.next(true);
    this.petService
      .getPets(
        this.currentPage,
        this.itemsPerPage,
        this.sortKey,
        this.getSortOrder()
      )
      .subscribe({
        next: (pets) => this.handlePetsResponse(pets),
        error: (err) => this.handleFetchError(err),
      });
  }

  private handlePetsResponse(pets: Pet[]): void {
    this.pets = pets;
    this.isLoadingSubject.next(false);
  }

  private handleFetchError(error: any): void {
    console.error('[PetListComponent] Error fetching pets:', error);
    this.isLoadingSubject.next(false);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.saveState();
    this.fetchPets();
  }

  onSort(columnKey: string): void {
    if (!this.allowedSortKeys.includes(columnKey)) {
      console.warn(
        `[PetListComponent] Sorting not allowed for column: ${columnKey}`
      );
      return;
    }

    this.sortKey = this.toggleSortOrder(columnKey);
    this.saveState();
    this.fetchPets();
  }

  private toggleSortOrder(columnKey: string): string {
    if (this.sortKey === columnKey) {
      this.isAscending = !this.isAscending;
    }
    return columnKey;
  }

  private getSortOrder(): SortOrder {
    return this.isAscending ? SortOrder.ASC : SortOrder.DESC;
  }

  navigateToDetails(petId: number): void {
    this.saveState();
    this.router.navigate([`/${AppRoutes.PET_DETAILS_ID}`, petId]);
  }

  trackByPetId: TrackByFunction<Pet> = (_, pet) => pet.id;
}
