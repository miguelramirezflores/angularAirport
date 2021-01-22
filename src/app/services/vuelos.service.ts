import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoVuelos ,Usuario } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VuelosService {

  constructor( private http : HttpClient ){ }


  getListadoVuelos( pagina : number , lineasPorPagina : number): Observable<ListadoVuelos>{
    return this.http.get<ListadoVuelos>('/vuelos/listado?pagina=' + pagina + '&vuelosPorPagina='+ lineasPorPagina).pipe();
  }
  reservar(ids:number[]){
    var dto ={
      'ids': ids
    };

    return  this.http.post<String>("/vuelos/reservar",dto);

  }

}
