import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva, Page } from 'src/app/Modelo/Reserva';
import { ReservaService } from 'src/app/Service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.scss']
})
export class ListarReservaComponent {
  filtroColumna = '';
  filtroAplicado = false;
  valorBusqueda = '';
  sortDir = 'asc';
  sortColumn = 'id';
  ordenAplicado = false;
  reservas: Reserva[];
  paginaActual = 0;
  elementosPorPagina = 3;
  totalPaginas = 0;
  mostrarErrorValorBusqueda = false;

  constructor(private service: ReservaService, private router: Router) {
    this.reservas = [];
  }

  ngOnInit() {
    this.getReservas();
  }

  //Botón Nuevo redirije a componente add
  nuevo() {
    this.router.navigate(["add"]);
  }

  //Traigo todos los estados a la tabla
  getReservas() {
    this.service.getReservas(this.paginaActual, this.sortColumn, this.sortDir, this.filtroColumna, this.valorBusqueda)
      .subscribe((data: { content: Reserva[]; totalPages: number; }) => {
        this.reservas = data.content;
        this.totalPaginas = data.totalPages;
      }
    );
  }

  // //Botón Editar
  // Editar(estado: Estado): void {
  //   localStorage.setItem('id', estado.id.toString());
  //   this.router.navigate(['edit']);
  // }

  // //Botón Eliminar
  // Delete(estado: Estado) {
  //   this.service.deleteEstado(estado)
  //     .subscribe(data => {
  //       this.estados = this.estados.filter(e => e !== estado);
  //     });
  //   alert('Estado eliminado');
  //   location.reload();
  // }

  //Validación campo de valor de búsqueda y aplicaciónd del filtro
  aplicarFiltro() {
    this.getReservas();
  }

  //Se seleccionó un orden
  aplicarOrden() {
    this.getReservas();
  }

  //Botón Limpiar filtro
  limpiarFiltro() {
    this.filtroColumna = '';
    this.valorBusqueda = '';
    this.filtroAplicado = false;
    this.mostrarErrorValorBusqueda = false;
    this.getReservas();
  }

  //Botón Limpiar Orden
  limpiarOrden() {
    this.sortColumn = '';
    this.ordenAplicado = false;
    this.getReservas();
  }

  //Pasaje entre páginas
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.getReservas();
  }

  parseDate(date: Date): string {
    let dateString: string = date.toString();
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  parseTime(horaInicio: Date, horaFin: Date): string {
    let horaInicioString: string = horaInicio.toString();
    let horaFinString: string = horaFin.toString();
    return new Date(horaInicioString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + 
      " - " + new Date(horaFinString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  parseMinutes(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let minutesLeft = minutes % 60;
    return hours + ":" + minutesLeft.toString().padStart(2, '0');
  }

}
