import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { PokemonResults } from '../models/pokedex.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public POKEAPI_URL_BASE: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<PokemonResults> {
    return this.http.get<PokemonResults>(`${this.POKEAPI_URL_BASE}?limit=12&offset=0`)
      .pipe(catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if(error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error code: ${error.status}; Message: ${error.message}`;
        }

        return throwError(() => errorMessage);
      }));
  }
}
