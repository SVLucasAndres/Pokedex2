import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

 
  getPokemon(name: any): Observable<any> {
    
    return this.http.get(this.apiUrl+"pokemon/"+name);
  }
}
