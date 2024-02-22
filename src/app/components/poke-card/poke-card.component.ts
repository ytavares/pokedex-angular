import { Component, Input, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { Observable, map, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-poke-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PokeapiService],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.scss',
})
export class PokeCardComponent implements OnInit {
  @Input() url: string | undefined;
  @Input() nome: string | undefined;
  @Input() code: number | undefined;

  url_img: string | undefined;

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.pokeapiService
      .getPokemonProfile(this.code)
      .subscribe((response: any) => {
        this.url_img = response.sprites.front_default;
      });
  }
}
