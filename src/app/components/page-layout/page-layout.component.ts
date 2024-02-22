import { Component, OnInit } from '@angular/core';
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
  atual: number | undefined;
  total: number | undefined;

  ngOnInit(): void {
    this.atual = 20;
    this.total = 20;
  }
}
