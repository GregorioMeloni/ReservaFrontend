import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspacioFisico, Page } from '../model/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacioFisicoService {

  constructor(private http: HttpClient) { }

  // Url común a quienes lo utilicen
  apiUrl = 'http://localhost:9500/api/v1/espacio-fisico';

  // Trae todos los estados -> GET All
  getEspaciosFisicos(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<EspacioFisico>> {
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
    //url = url + '&size=5';

    // Añadir filtros
    if (filterColumn != '' && filter != '') {
      url = url + '&' + filterColumn + '=' + filter;
    }
    
    // Devolver
    return this.http.get<Page<EspacioFisico>>(url);
  }
}
