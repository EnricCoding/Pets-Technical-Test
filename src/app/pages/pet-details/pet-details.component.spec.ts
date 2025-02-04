import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PetDetailsComponent } from './pet-details.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { PetService } from '../../core/pet/pet.service';
import { AppRoutes } from '../../app-routing.module';
import { PetKind } from '../../enum/petKind/pet-kind.enum';
import { Pet } from '../../models/pet/pet.model';
import { DEFAULTIMAGE } from '../../utils';

describe('PetDetailsComponent', () => {
  let component: PetDetailsComponent;
  let fixture: ComponentFixture<PetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetDetailsComponent],
      imports: [
        TranslateModule.forRoot(),
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        TranslateService,
        TranslateStore,
        PetService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pet details and assign to pet$', () => {
    const mockPet: Pet = {
      id: 1,
      name: 'Dog',
      kind: PetKind.DOG,
      weight: 10,
      height: 20,
      length: 30,
      photo_url: 'url',
      description: 'Friendly dog',
    };

    const petService = TestBed.inject(PetService);
    spyOn(petService, 'getPetById').and.returnValue(of(mockPet));

    component.fetchPetDetails(1).subscribe(); 
    fixture.detectChanges();

    component.pet$.subscribe((pet) => {
      expect(pet).toEqual(mockPet);
    });

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });

    component.errorMessage$.subscribe((errorMessage) => {
      expect(errorMessage).toBeNull();
    });
  });

  it('should handle invalid ID and redirect to home', fakeAsync(() => {
    const router = TestBed.inject(Router);
  
    spyOn(component['translate'], 'get').and.returnValue(of('Invalid ID'));
    component['handleInvalidId']();
    tick();
  
    component.errorMessage$.subscribe((errorMessage) => {
      expect(errorMessage).toBe('Invalid ID');
    });
    tick(3000);
  
    expect(router.navigate).toHaveBeenCalledWith([AppRoutes.HOME]);
  }));


  it('should set default image when image fails to load', () => {
    const img = document.createElement('img');
    img.src = 'invalid-url'; 
    const event = { target: img } as unknown as Event;
    component.handleImageError(event);
    expect(img.src).toContain(DEFAULTIMAGE);
  });

  it('should handle error and update errorMessage$', () => {
    spyOn(component['translate'], 'get').and.returnValue(of('Error fetching details'));

    component['handleError'](new Error('Test error'), 'petDetails.errorLoadingDetails');

    component.errorMessage$.subscribe((errorMessage) => {
      expect(errorMessage).toBe('Error fetching details');
    });

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });
  });
});
