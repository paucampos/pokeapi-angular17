import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { CardPokeComponent } from '../../components/card-poke/card-poke.component';
import { FailPokeComponent } from '../../components/fail-poke/fail-poke.component';
import { Pokemon, PokemonResults } from '../../models/pokedex.model';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AsyncPipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { PokemonItemComponent } from '../../components/pokemon-item/pokemon-item.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    CardPokeComponent,
    ErrorMessageComponent,
    FailPokeComponent,
    FormsModule,
    HeaderComponent,
    LoaderComponent,
    PokemonItemComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title: string = 'Pokédex with Angular 17';
  public subtitle: string = 'Based on PokeAPI';
  public pokemonName: string = '';
  public pokemon: null | Pokemon = null;
  public POKEAPI_URL_BASE: string = 'https://pokeapi.co/api/v2/pokemon/';
  public loading: boolean = true;
  public pokemonList$!: Observable<PokemonResults>;
  public errorMessage!: string;

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.searchPokemon();
    this.pokemonList$ = this.pokemonService.getPokemonList().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }

  private pokeNameSanitize(pokeName: string): string {
    return pokeName.toLowerCase().trim();
  }

  public searchPokemon(): void {
    const pokeName = this.pokeNameSanitize(this.pokemonName);
    this.loading = true;

    const pokeRandom = Math.floor(Math.random() * 100);
    this.pokemonService.getOnePokemon(pokeName || pokeRandom).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.pokemonName = pokemon.name;
        this.loading = false;
      },
      error: (e) => {
        console.error('error: ', e);
            this.pokemon = null;
            this.loading = false;
      },
      complete: () => console.info('complete'),
    });
  }
}
