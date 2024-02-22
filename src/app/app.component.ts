import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PokedexListComponent } from './components/pokedex-list/pokedex-list.component';
import { PokeapiService } from './services/pokeapi.service';
import { FooterComponent } from './components/footer/footer.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    PageLayoutComponent,
    FooterComponent,
  ],
  providers: [PokeapiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokedex-angular';
}
