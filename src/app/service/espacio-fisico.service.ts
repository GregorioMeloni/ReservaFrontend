import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspacioFisico, Page } from '../model/types';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EspacioFisicoService {

  // URL base
  private API_URL = environment.apiUrl + '/espacio-fisico';

  constructor(private http: HttpClient) { }

  // Trae todos los estados -> GET All
  getEspaciosFisicos(page: number, sortBy: string, sortDir: string, filterColumn: string, filter: string): Observable<Page<EspacioFisico>> {
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
