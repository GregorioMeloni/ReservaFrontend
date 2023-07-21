import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva, Page } from '../model/types';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  // URL base
  private API_URL = environment.apiUrl + '/reserva';

  constructor(private http: HttpClient) { }

  // Trae todas las reservas -> GET All
  getReservas(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<Reserva>> {
    // Default values
    let url = this.API_URL;

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
    return this.http.get<Reserva>(this.API_URL + "/" + id);
  }

  // Crea una reserva -> POST Create
  createReserva(reserva: Reserva) {
    let nuevaReserva: NuevaReserva = {
      fechaHoraInicio: reserva.fechaHoraInicio,
      fechaHoraFin: reserva.fechaHoraFin,
      espacioFisico: { id: reserva.espacioFisico.id },
      cliente: { id: reserva.cliente.id },
      motivoReserva: reserva.motivoReserva,
      comentario: reserva.comentario,
      motivoRechazo: reserva.motivoRechazo
    };
  
    return this.http.post<Reserva>(this.API_URL, nuevaReserva);
  }
  

  // Actualiza una reserva -> PUT Update
  updateReserva(reserva: Reserva) {
    return this.http.put<Reserva>(this.API_URL + "/" + reserva.id, reserva);
  }

  // Elimina una reserva -> DELETE Delete
  deleteReserva(reserva: Reserva) {
    return this.http.delete<Reserva>(this.API_URL + "/" + reserva.id);
  }

}

export interface NuevaReserva {
  fechaHoraInicio: string;
  fechaHoraFin: string;
  espacioFisico: {id: number};
  cliente: {id: number};
  motivoReserva: string;
  comentario: string;
  motivoRechazo: string;
}
