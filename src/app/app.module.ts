import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PokedexListComponent } from './components/pokedex-list/pokedex-list.component';
import { PokeapiService } from './services/pokeapi.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CommonModule,
    AppComponent,
    HeaderComponent,
    PokedexListComponent,
  ],
  imports: [BrowserModule],
  providers: [PokeapiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
