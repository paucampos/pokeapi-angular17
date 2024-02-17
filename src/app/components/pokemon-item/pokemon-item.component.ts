import { Component, Input } from '@angular/core';
import { PokemonI } from '../../models/pokedex.model';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss'
})
export class PokemonItemComponent {
  @Input() public pokemonInfo!: PokemonI;        

}
