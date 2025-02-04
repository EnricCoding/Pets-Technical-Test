import { TestBed } from '@angular/core/testing';
import { PetStorageService } from './pet-storage.service';
import { Pet } from '../../models/pet/pet.model';
import { StorageKeys } from '../../enum/storageKeys/storage-keys.enum';
import { PetKind } from '../../enum/petKind/pet-kind.enum';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('PetStorageService', () => {
  let service: PetStorageService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem', 'removeItem', 'clear']);

    TestBed.configureTestingModule({
      providers: [
        PetStorageService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(PetStorageService);
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no pet of the day is stored', () => {
    localStorageService.getItem.and.returnValue(null);

    const petOfTheDay = service.getStoredPetOfTheDay();
    expect(petOfTheDay).toBeNull();
    expect(localStorageService.getItem).toHaveBeenCalledWith(StorageKeys.PET_OF_THE_DAY);
    expect(localStorageService.getItem).toHaveBeenCalledWith(StorageKeys.PET_OF_THE_DAY_DATE);
  });

  it('should return the stored pet of the day if the date matches today', () => {
    const mockPet: Pet = {
      id: 1,
      name: 'Dog',
      kind: PetKind.DOG,
      weight: 20,
      height: 50,
      length: 60,
      photo_url: 'url',
      description: 'A friendly dog',
    };

    const today = new Date().toISOString().split('T')[0];
    localStorageService.getItem.withArgs(StorageKeys.PET_OF_THE_DAY).and.returnValue(mockPet);
    localStorageService.getItem.withArgs(StorageKeys.PET_OF_THE_DAY_DATE).and.returnValue(today);

    const petOfTheDay = service.getStoredPetOfTheDay();
    expect(petOfTheDay).toEqual(mockPet);
  });

  it('should return null if the stored date does not match today', () => {
    const mockPet: Pet = {
      id: 1,
      name: 'Dog',
      kind: PetKind.DOG,
      weight: 20,
      height: 50,
      length: 60,
      photo_url: 'url',
      description: 'A friendly dog',
    };

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    localStorageService.getItem.withArgs(StorageKeys.PET_OF_THE_DAY).and.returnValue(mockPet);
    localStorageService.getItem.withArgs(StorageKeys.PET_OF_THE_DAY_DATE).and.returnValue(yesterday);

    const petOfTheDay = service.getStoredPetOfTheDay();
    expect(petOfTheDay).toBeNull();
  });

  it('should select a random pet and store it as pet of the day', () => {
    const mockPets: Pet[] = [
      { id: 1, name: 'Dog', kind: PetKind.DOG, weight: 20, height: 50, length: 60, photo_url: 'url', description: 'A friendly dog' },
      { id: 2, name: 'Cat', kind: PetKind.CAT, weight: 5, height: 30, length: 40, photo_url: 'url', description: 'A friendly cat' },
    ];

    const today = new Date().toISOString().split('T')[0];
    const randomPet = mockPets[0];

    spyOn(service as any, 'selectRandomPet').and.returnValue(randomPet);

    const petOfTheDay = service.setPetOfTheDay(mockPets);

    expect(petOfTheDay).toEqual(randomPet);
    expect(localStorageService.setItem).toHaveBeenCalledWith(StorageKeys.PET_OF_THE_DAY, randomPet);
    expect(localStorageService.setItem).toHaveBeenCalledWith(StorageKeys.PET_OF_THE_DAY_DATE, today);
  });

  it('should return null if no pets are available to select', () => {
    const petOfTheDay = service.setPetOfTheDay([]);
    expect(petOfTheDay).toBeNull();
    expect(localStorageService.setItem).not.toHaveBeenCalled();
  });
});
