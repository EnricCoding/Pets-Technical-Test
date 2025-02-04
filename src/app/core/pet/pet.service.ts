import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pet } from '../../models/pet/pet.model';
import { SortOrder } from '../../enum/sortOrder/sort-order.enum';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private static readonly BASE_API_URL =
    'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets';

  constructor(private http: HttpClient) {}

  getPets(
    page?: number,
    perPage?: number,
    sort?: string,
    order?: SortOrder
  ): Observable<Pet[]> {
    let params = new HttpParams();

    if (page !== undefined && perPage !== undefined) {
      params = params.set('_page', page.toString()).set('_per_page', perPage.toString());
    }

    if (sort) {
      const sortParam = order === SortOrder.DESC ? `-${sort}` : sort;
      params = params.set('_sort', sortParam);
    }

    return this.http.get<Pet[]>(PetService.BASE_API_URL, { params }).pipe(
      map((pets) => pets.map((pet) => this.assignHealth(pet))),
      catchError((error) => this.handleError(error, 'FETCH_PETS'))
    );
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${PetService.BASE_API_URL}/${id}`).pipe(
      map((pet) => this.assignHealth(pet)),
      catchError((error) =>
        this.handleError(error, `Failed to fetch pet details for ID: ${id}`)
      )
    );
  }

 
  private assignHealth(pet: Pet): Pet {
    if (pet.kind === 'cat' && pet.number_of_lives === 1) {
      pet.healthStatus = 'unhealthy';
    } else if (pet.weight > 0 && pet.height > 0 && pet.length > 0) {
      const healthRatio = pet.weight / (pet.height * pet.length);
      pet.healthStatus =
        healthRatio < 2 || healthRatio > 5
          ? 'unhealthy'
          : healthRatio >= 2 && healthRatio < 3
          ? 'very healthy'
          : 'healthy';
    } else {
      pet.healthStatus = 'unknown'; 
    }

    return pet;
  }

  private handleError(
    error: HttpErrorResponse,
    customMessage: string
  ): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Client-side error: ${error.error.message}`
        : `Server-side error: HTTP ${error.status} - ${error.message}`;

    console.error(`[PetService] ${customMessage}: ${errorMessage}`);
    return throwError(
      () => new Error(`${customMessage}. Please try again later.`)
    );
  }
}
