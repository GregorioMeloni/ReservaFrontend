import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Page } from '../model/types';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  
  // URL base
  private API_URL = environment.apiUrl + '/estado';

  constructor(private http: HttpClient) { }

  // Url común a quienes lo utilicen
  apiUrl = 'http://localhost:9500/api/v1/estado';

  // Trae todos los estados -> GET All
  getEstados(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<Estado>> {
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

    // Tamaño de página
    url = url + '&size=10';

    // Añadir filtros
    if (filterColumn != '' && filter != '') {
      url = url + '&' + filterColumn + '=' + filter;
    }
    
    // Devolver
    return this.http.get<Page<Estado>>(url);
  }

  // Trae un estado por id -> GET by Id
  getEstadoId(id: number) {
    return this.http.get<Estado>(this.apiUrl + "/" + id);
  }

  // Crea un estado -> POST Create
  createEstado(estado: Estado) {
    return this.http.post<Estado>(this.apiUrl, estado);
  }

  // Actualiza un estado -> PUT Update
  updateEstado(estado: Estado) {
    return this.http.put<Estado>(this.apiUrl + "/" + estado.id, estado);
  }

  // Elimina un estado -> DELETE Delete
  deleteEstado(estado: Estado) {
    return this.http.delete<Estado>(this.apiUrl + "/" + estado.id);
  }  

}
