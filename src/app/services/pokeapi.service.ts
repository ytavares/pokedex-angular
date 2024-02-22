import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2';
  private limitPerPage = 20;

  constructor(private httpClient: HttpClient) {}

  getPokemons(page: number): Observable<any> {
    const offset = (page - 1) * this.limitPerPage;
    return this.httpClient.get(
      `${this.apiUrl}/pokemon/?offset=${page}&limit=${this.limitPerPage}`
    );
  }

  getPokemonProfile(code?: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/pokemon/${code}`);
  }
}
