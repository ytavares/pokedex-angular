import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokeCardComponent } from '../poke-card/poke-card.component';

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, PokeCardComponent],
  providers: [PokeapiService],
  templateUrl: './pokedex-list.component.html',
  styleUrl: './pokedex-list.component.scss',
})
export class PokedexListComponent implements OnInit {
  pokemons: any[] = [];
  totalPokemons: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;
  @Input() searchTerm: string = '';
  searched: boolean = false;
  isFirstPage: boolean = true;
  disabledPreview: boolean = true;
  isLastPage: boolean = false;
  disabledNext: boolean = false;

  totalPages: number = 1;

  @Output() totalDataEvent = new EventEmitter<number>();
  @Output() currentTotalDataEvent = new EventEmitter<number>();

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.loadPokemons();
    if (this.currentPage > 1) {
      this.disabledPreview = false;
      this.isFirstPage = false;
    } else {
      this.disabledPreview = true;
      this.isFirstPage = true;
    }
  }

  setPokemonCode(i: number) {
    if ((this.currentPage - 1) * this.pageSize + i + 1 < 1026) {
      return (this.currentPage - 1) * this.pageSize + i + 1;
    } else {
      return 8974 + (this.currentPage - 1) * this.pageSize + i + 1;
    }
  }
  loadPokemons() {
    const offset = Math.max((this.currentPage - 1) * this.pageSize, 0);
    this.pokeapiService.getPokemons(offset).subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalPokemons = data.count;
      this.totalPages = Math.ceil(this.totalPokemons / this.pageSize);
      this.totalDataEvent.emit(this.totalPokemons);
      this.currentTotalDataEvent.emit(this.pokemons.length);
    });
  }

  searchPokemon(searchTerm: string) {
    if (searchTerm === '') {
      this.loadPokemons();
    } else {
      this.pokeapiService
        .getPokemonsSearch(searchTerm)
        .subscribe((data: any) => {
          if (Array.isArray(data)) {
            this.pokemons = data; // Se for uma lista de pokémons, atribui normalmente
          } else if (typeof data === 'object' && data !== null) {
            this.pokemons = [data]; // Se for um único pokémon, cria uma lista contendo apenas esse pokémon
          }
          this.totalPokemons = 1;
          this.totalPages = Math.ceil(this.totalPokemons / this.pageSize);
          this.totalDataEvent.emit(this.totalPokemons);
          this.currentTotalDataEvent.emit(this.currentPage);
          this.searched = true;
          console.log(this.pokemons);
        });
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemons();
      this.disabledNext = false;
      this.disabledPreview = false;
      this.isFirstPage = false;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
      this.disabledPreview = false;
      this.disabledNext = false;
      this.isLastPage = false;
    }
  }

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.loadPokemons();
      this.isLastPage = true;
      this.disabledPreview = false;
      this.isFirstPage = false;
    }
  }

  firstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.loadPokemons();
      this.isFirstPage = true;
      this.disabledNext = false;
      this.isLastPage = false;
      this.disabledPreview = true;
    }
  }
}
