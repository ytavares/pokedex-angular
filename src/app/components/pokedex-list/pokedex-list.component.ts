import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  totalPages: number = 1;

  @Output() totalDataEvent = new EventEmitter<number>();
  @Output() currentTotalDataEvent = new EventEmitter<number>();

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    const offset = Math.max((this.currentPage - 1) * this.pageSize, 0);
    this.pokeapiService.getPokemons(offset).subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalPokemons = data.count;
      this.totalPages = Math.ceil(this.totalPokemons / this.pageSize);
      this.totalDataEvent.emit(this.totalPokemons);
      this.currentTotalDataEvent.emit(this.currentPage * 20);
    });
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }
}
