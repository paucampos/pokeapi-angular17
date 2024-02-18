import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonResults } from '../models/pokedex.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getOnePokemon(pokemon: any): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.apiBasePoke}pokemon/${pokemon}`)
      .pipe(map((pokem: any) => {
        return { 
          abilities: pokem.abilities,
          name: pokem.name,
          id: pokem.id,
          image: pokem.sprites?.other?.dream_world?.front_default,
          type: pokem.types[0].type.name,
          weight: pokem.weight,
          height: pokem.height,
        }
      }
    ));
  }

  getPokemonList(): Observable<PokemonResults> {
    return this.http.get<PokemonResults>(`${environment.apiBasePoke}pokemon?limit=12&offset=0`);
  }
}
