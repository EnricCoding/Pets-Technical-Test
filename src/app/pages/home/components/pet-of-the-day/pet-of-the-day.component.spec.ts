import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PetOfTheDayComponent } from './pet-of-the-day.component';
import { TranslateModule } from '@ngx-translate/core';
import { PetService } from '../../../../core/pet/pet.service';
import { PetStorageService } from '../../../../core/pet-storage/pet-storage.service';
import { of } from 'rxjs';
import { Pet } from '../../../../models/pet/pet.model';
import { PetKind } from '../../../../enum/petKind/pet-kind.enum';

describe('PetOfTheDayComponent', () => {
  let component: PetOfTheDayComponent;
  let fixture: ComponentFixture<PetOfTheDayComponent>;
  let mockPetStorageService: jasmine.SpyObj<PetStorageService>;
  let mockPetService: jasmine.SpyObj<PetService>;

  beforeEach(async () => {
    mockPetStorageService = jasmine.createSpyObj('PetStorageService', [
      'getStoredPetOfTheDay',
      'setPetOfTheDay',
    ]);
    mockPetService = jasmine.createSpyObj('PetService', ['getPets']);

    await TestBed.configureTestingModule({
      declarations: [PetOfTheDayComponent],
      imports: [
        TranslateModule.forRoot(), 
      ],
      providers: [
        provideHttpClient(),
        { provide: PetStorageService, useValue: mockPetStorageService },
        { provide: PetService, useValue: mockPetService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the stored pet of the day on init', () => {
    const mockStoredPet: Pet = {
      id: 1,
      name: 'Dog',
      kind: PetKind.DOG,
      weight: 20,
      height: 50,
      length: 60,
      photo_url: 'url',
      description: 'A friendly dog',
    };
  
    mockPetStorageService.getStoredPetOfTheDay.and.returnValue(mockStoredPet);
  
    component.ngOnInit();
  
    expect(mockPetStorageService.getStoredPetOfTheDay).toHaveBeenCalled();
  
    component.petOfTheDay$.subscribe((petOfTheDay) => {
      expect(petOfTheDay).toEqual(mockStoredPet);
    });
  })

  it('should generate a new pet of the day and set it in the component', () => {
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
    mockPetStorageService.setPetOfTheDay.and.returnValue(mockPets[0]);
  
    component.generatePetOfTheDay();
  
    expect(mockPetService.getPets).toHaveBeenCalled();
    expect(mockPetStorageService.setPetOfTheDay).toHaveBeenCalledWith(mockPets);
  
    component.petOfTheDay$.subscribe((petOfTheDay) => {
      expect(petOfTheDay).toEqual(mockPets[0]);
    });
  });
  
});
