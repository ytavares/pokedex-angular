import { Component, OnInit } from '@angular/core';
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

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    const offset = Math.max((this.currentPage - 1) * this.pageSize, 0); // Garante que o offset nunca seja negativo
    this.pokeapiService.getPokemons(offset).subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalPokemons = data.count;
    });
    console.log(this.totalPokemons);
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
