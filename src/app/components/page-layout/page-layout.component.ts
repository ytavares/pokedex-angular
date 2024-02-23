import { Component, OnInit, ViewChild, input } from '@angular/core';
import { PokedexListComponent } from '../pokedex-list/pokedex-list.component';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [PokedexListComponent],
  providers: [PokeapiService],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent implements OnInit {
  @ViewChild(PokedexListComponent)
  pokedexListComponent!: PokedexListComponent;
  atual: number | undefined;
  total: number | undefined;
  searchTerm: string = '';

  ngOnInit(): void {}

  receiveTotalDataFromPokelist(data: number) {
    this.total = data;
  }
  receiveCurrentDataFromPokelist(data: number) {
    this.atual = data;
  }

  onSearchInput(value: string): void {
    this.searchTerm = value;
    this.pokedexListComponent.searchPokemon(this.searchTerm.toLowerCase());
  }

  onClickSearch() {
    this.pokedexListComponent.searchPokemon(this.searchTerm);
  }
}
