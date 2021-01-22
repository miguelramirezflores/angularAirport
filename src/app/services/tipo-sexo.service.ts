import { Injectable } from '@angular/core';
import { TipoSexo } from '../interfaces/interfaces';
import {HttpClient} from '@angular/common/http';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TipoSexoService {

  constructor( private http : HttpClient) { }

  getListadoTipoSexo() : Observable<TipoSexo[]>{
    return this.http.get<TipoSexo[]>('/tiposexo/all');
  }

}
