import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Pet } from '../../../../models/pet/pet.model';
import { PetStorageService } from '../../../../core/pet-storage/pet-storage.service';
import { PetService } from '../../../../core/pet/pet.service';
import { TranslateService } from '@ngx-translate/core';
import { interval, BehaviorSubject, Subscription } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import { calculateTimeLeft } from '../../../../utils';

@Component({
  selector: 'app-pet-of-the-day',
  templateUrl: './pet-of-the-day.component.html',
  styleUrls: ['./pet-of-the-day.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class PetOfTheDayComponent implements OnInit, OnDestroy {
  petOfTheDay$ = new BehaviorSubject<Pet | null>(null); 
  timeLeft$ = new BehaviorSubject<string>(''); 
  errorMessage: string | null = null;
  private countdownSubscription: Subscription | null = null;

  constructor(
    private readonly petStorageService: PetStorageService,
    private readonly petService: PetService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkStoredPetOfTheDay();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  private checkStoredPetOfTheDay(): void {
    const storedPet = this.petStorageService.getStoredPetOfTheDay();
    if (storedPet) {
      this.petOfTheDay$.next(storedPet);
    }
  }

  generatePetOfTheDay(): void {
    this.petService.getPets().subscribe({
      next: (pets) => {
        if (pets.length > 0) {
          const selectedPet = this.petStorageService.setPetOfTheDay(pets);
          this.petOfTheDay$.next(selectedPet); 
          this.errorMessage = null;
        } else {
          this.setError('petOfTheDay.noPets');
        }
      },
      error: () => {
        this.setError('petOfTheDay.errorFetchingPets');
      },
    });
  }

  private startCountdown(): void {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

    this.countdownSubscription = interval(1000)
      .pipe(
        startWith(0),
        map(() => calculateTimeLeft(midnight)),
        takeWhile((timeLeft) => timeLeft !== '00:00:00') 
      )
      .subscribe((timeLeft) => {
        this.timeLeft$.next(timeLeft);
      });
  }

  private clearCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdownSubscription = null;
    }
  }

  private setError(translationKey: string): void {
    this.translateService.get(translationKey).subscribe((translatedMessage) => {
      this.errorMessage = translatedMessage;
      this.petOfTheDay$.next(null); 
    });
  }
}
