import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetListComponent } from './pet-list.component';
import { PetService } from '../../../../core/pet/pet.service';
import { SortStateService } from '../../../../core/sort-state/sort-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Pet } from '../../../../models/pet/pet.model';
import { SortOrder } from '../../../../enum/sortOrder/sort-order.enum';
import { PetKind } from '../../../../enum/petKind/pet-kind.enum';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let mockPetService: jasmine.SpyObj<PetService>;
  let mockSortStateService: jasmine.SpyObj<SortStateService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockPetService = jasmine.createSpyObj('PetService', ['getPets']);
    mockSortStateService = jasmine.createSpyObj('SortStateService', [
      'getState',
      'setState',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PetListComponent],
      providers: [
        { provide: PetService, useValue: mockPetService },
        { provide: SortStateService, useValue: mockSortStateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pets and update state', () => {
    const mockPets: Pet[] = [
      {
        id: 1,
        name: 'Dog',
        kind: PetKind.DOG,
        weight: 20,
        height: 50,
        length: 60,
        photo_url: 'url',
        description: 'A friendly dog',
      },
    ];
    mockPetService.getPets.and.returnValue(of(mockPets));

    component.fetchPets();
    expect(mockPetService.getPets).toHaveBeenCalledWith(
      component.currentPage,
      component.itemsPerPage,
      component.sortKey,
      SortOrder.ASC
    );

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });

    expect(component.pets).toEqual(mockPets);
  });

  it('should handle error when fetching pets fails', () => {
    const error = new Error('Failed to fetch pets');
    mockPetService.getPets.and.returnValue(throwError(() => error));

    spyOn(console, 'error'); 

    component.fetchPets();

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });

    expect(console.error).toHaveBeenCalledWith(
      '[PetListComponent] Error fetching pets:',
      error
    );
  });

  it('should navigate to details when navigateToDetails is called', () => {
    const mockPetId = 1;
    component.navigateToDetails(mockPetId);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      `/pet-details`,
      mockPetId,
    ]);
    expect(mockSortStateService.setState).toHaveBeenCalled();
  });

  it('should update state and fetch pets on page change', () => {
    const newPage = 2;
    const mockPets: Pet[] = [
      {
        id: 2,
        name: 'Cat',
        kind: PetKind.CAT,
        weight: 10,
        height: 25,
        length: 40,
        photo_url: 'url',
        description: 'A friendly cat',
      },
    ];
    mockPetService.getPets.and.returnValue(of(mockPets));

    component.onPageChange(newPage);

    expect(component.currentPage).toBe(newPage);
    expect(mockSortStateService.setState).toHaveBeenCalled();
    expect(mockPetService.getPets).toHaveBeenCalledWith(
      newPage,
      component.itemsPerPage,
      component.sortKey,
      SortOrder.ASC
    );
    expect(component.pets).toEqual(mockPets);
  });

});
