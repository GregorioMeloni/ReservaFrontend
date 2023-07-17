import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva, Page } from '../Modelo/Reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  //Url común a quienes lo utilicen
  Url = 'http://localhost:9500/api/v1/reserva';

  //Trae todas las reservas -> GET All
  getReservas(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<Reserva>> {
    // Default values
    let url = this.Url;

    // Paginación
    url = url + '?page=' + page;

    // Si no hay sorting
    if (sortBy == null || sortBy == undefined || sortDir == null || sortDir == undefined) {
      url = url + '&sort=id,asc';
    } else {
      url = url + '&sort=' + sortBy + ',' + sortDir;
    }

    // Añadir filtros
    if (filterColumn != '' && filter != '') {
      url = url + '&' + filterColumn + '=' + filter;
    }
    
    console.log(url)
    return this.http.get<Page<Reserva>>(url);
  }

}
