import { TestBed } from '@angular/core/testing';
import { PetService } from './pet.service';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SortOrder } from '../../enum/sortOrder/sort-order.enum';
import { Pet } from '../../models/pet/pet.model';
import { PetKind } from '../../enum/petKind/pet-kind.enum';

describe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetService,
        provideHttpClient(), 
      ],
    });
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should construct the correct query parameters in getPets', () => {
    const httpClientSpy = spyOn(service['http'], 'get').and.callThrough();
  
    service.getPets(2, 10, 'name', SortOrder.ASC).subscribe();
  
    expect(httpClientSpy).toHaveBeenCalledWith(
      jasmine.any(String),
      jasmine.objectContaining({
        params: jasmine.anything(), 
      })
    );
  
    const mostRecentCallArgs = httpClientSpy.calls.mostRecent().args[1];
    const capturedParams = mostRecentCallArgs ? mostRecentCallArgs.params : null;
    if (capturedParams) {
      expect((capturedParams as any).get('_page')).toBe('2');
      expect((capturedParams as any).get('_per_page')).toBe('10');
      expect((capturedParams as any).get('_sort')).toBe('name');
    } else {
      fail('capturedParams is null or undefined');
    }
  });

  it('should assign the correct health status to pets', () => {
    const mockPets:Pet[] = [
      { id: 1, name: 'Dog', kind: PetKind.DOG, weight: 10, height: 2, length: 5, photo_url: '', description: '' },
      { id: 2, name: 'Cat', kind: PetKind.CAT, weight: 2, height: 1, length: 1, photo_url: '', description: '' },
    ];

    const httpClientSpy = spyOn(service['http'], 'get').and.returnValue(
      of(mockPets)
    );

    service.getPets().subscribe((pets) => {
      expect(pets[0].healthStatus).toBe('unhealthy');
      expect(pets[1].healthStatus).toBe('very healthy');
    });

    expect(httpClientSpy).toHaveBeenCalled();
  });

  it('should handle errors and return a custom message', () => {
    const errorResponse = {
      status: 404,
      message: 'Not Found',
    };
  
    const httpClientSpy = spyOn(service['http'], 'get').and.returnValue(
      throwError(() => new HttpErrorResponse(errorResponse))
    );
  
    service.getPets().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.message).toBe('FETCH_PETS. Please try again later.');
      },
    });
  
    expect(httpClientSpy).toHaveBeenCalled();
  });

});
