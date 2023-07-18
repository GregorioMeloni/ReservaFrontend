import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva, Page } from '../model/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  // Url común a quienes lo utilicen
  apiUrl: string = 'http://localhost:9500/api/v1/reserva';

  // Trae todas las reservas -> GET All
  getReservas(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<Reserva>> {
    // Default values
    let url = this.apiUrl;

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
    
    // Devolver
    return this.http.get<Page<Reserva>>(url);
  }

  // Trae una reserva por id -> GET by Id
  getReservaId(id: number) {
    return this.http.get<Reserva>(this.apiUrl + "/" + id);
  }

  // Crea una reserva -> POST Create
  createReserva(reserva: Reserva) {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Actualiza una reserva -> PUT Update
  updateReserva(reserva: Reserva) {
    return this.http.put<Reserva>(this.apiUrl + "/" + reserva.id, reserva);
  }

  // Elimina una reserva -> DELETE Delete
  deleteReserva(reserva: Reserva) {
    return this.http.delete<Reserva>(this.apiUrl + "/" + reserva.id);
  }

}
