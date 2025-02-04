import { Injectable } from '@angular/core';
import { Pet } from '../../models/pet/pet.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { StorageKeys } from '../../enum/storageKeys/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class PetStorageService {
  constructor(private localStorageService: LocalStorageService) {}

  getStoredPetOfTheDay(): Pet | null {
    const today = this.getTodayUTCDate();
    const storedDate = this.localStorageService.getItem<string>(StorageKeys.PET_OF_THE_DAY_DATE);
    const storedPet = this.localStorageService.getItem<Pet>(StorageKeys.PET_OF_THE_DAY);

    if (storedDate === today && storedPet) {
      return storedPet;
    }
    return null;
  }

  setPetOfTheDay(pets: Pet[]): Pet | null {
    if (!pets || pets.length === 0) {
      console.warn('[PetStorageService] No pets available to select as Pet of the Day.');
      return null;
    }

    const today = this.getTodayUTCDate();
    const petOfTheDay = this.selectRandomPet(pets);
    this.storePetOfTheDay(petOfTheDay, today);

    return petOfTheDay;
  }

  private getTodayUTCDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  private selectRandomPet(pets: Pet[]): Pet {
    const randomIndex = Math.floor(Math.random() * pets.length);
    return pets[randomIndex];
  }

  private storePetOfTheDay(pet: Pet, date: string): void {
    this.localStorageService.setItem(StorageKeys.PET_OF_THE_DAY, pet);
    this.localStorageService.setItem(StorageKeys.PET_OF_THE_DAY_DATE, date);
  }
}
