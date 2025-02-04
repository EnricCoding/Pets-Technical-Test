import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../models/pet/pet.model';
import { PetService } from '../../core/pet/pet.service';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutes } from '../../app-routing.module';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { DEFAULTIMAGE } from '../../utils';

interface PetDetailsRouteParams {
  id: string;
}

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  pet$ = new BehaviorSubject<Pet | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(true);
  errorMessage$ = new BehaviorSubject<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) =>
          this.handleRouteParams((params as PetDetailsRouteParams).id)
        )
      )
      .subscribe();
  }

  private handleRouteParams(id: string): Observable<unknown> {
    const petId = Number(id);
    if (isNaN(petId) || petId <= 0) {
      this.handleInvalidId();
      return EMPTY;
    }
    return this.fetchPetDetails(petId);
  }

  fetchPetDetails(id: number): Observable<void> {
    this.setLoading(true);
    return this.petService.getPetById(id).pipe(
      takeUntil(this.destroy$),
      switchMap((pet) => {
        this.handleSuccess(pet);
        return EMPTY;
      }),
      catchError((err) => {
        this.handleError(err, 'petDetails.errorLoadingDetails');
        return EMPTY;
      })
    );
  }

  private handleSuccess(pet: Pet): void {
    this.pet$.next(pet);
    this.isLoading$.next(false);
    this.errorMessage$.next(null);
  }

  private handleError(error: any, translationKey: string): void {
    console.error(`[PetDetailsComponent] Error:`, error);
    this.getTranslatedMessage(translationKey).subscribe((message) => {
      this.errorMessage$.next(message);
      this.pet$.next(null);
    });
    this.setLoading(false);
  }

  private setLoading(state: boolean): void {
    this.isLoading$.next(state);
  }

  private handleInvalidId(): void {
    this.handleError(null, 'petDetails.invalidId');
    setTimeout(() => this.router.navigate([AppRoutes.HOME]), 3000);
  }

  private getTranslatedMessage(key: string): Observable<string> {
    return this.translate.get(key);
  }

  goBack(): void {
    this.router.navigate([AppRoutes.HOME]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = DEFAULTIMAGE;
  }
}
