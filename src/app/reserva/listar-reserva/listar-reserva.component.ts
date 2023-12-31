import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/model/types';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.scss']
})
export class ListarReservaComponent {
  filtroColumna = '';
  valorBusqueda = '';
  sortDir = 'asc';
  sortColumn = 'id';
  reservas: Reserva[] = [];
  paginaActual = 0;
  elementosPorPagina = 10;
  totalPaginas = 0;
  mostrarErrorValorBusqueda = false;

  // Inyección de dependencias
  constructor(private service: ReservaService, private router: Router) {
    
  }

  // Al iniciar el componente, se obtienen las reservas
  ngOnInit() {
    this.getReservas();
  }

  // Botón Nuevo redirije a componente add
  nuevo() {
    this.router.navigate(["add-reserva"]);
  }

  formatDate(dateTime: string):string {
    const date = new Date(dateTime);
    return `${date.getFullYear()}/${this.padNumber(date.getMonth() + 1)}/${this.padNumber(date.getDate())}`;
  }

  formatTime(dateTime: string):string {

    const dateTimeParts = dateTime.split('T');

    const timePart = dateTimeParts[1];

    return timePart.slice(0, 5);
  }

  private padNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  // Obtener reservas con paginación y ordenamiento
  getReservas() {
    this.service.getReservas(this.paginaActual, this.sortColumn, this.sortDir, this.filtroColumna, this.valorBusqueda)
      .subscribe(data => {
        this.reservas = data.content;
        this.totalPaginas = data.totalPages;
      });
  }

  // Botón Editar
  editar(reserva: Reserva): void {
    localStorage.setItem('id', reserva.id.toString());
    this.router.navigate(['edit-reserva']);
  }

  // Botón Eliminar
  delete(reserva: Reserva) {
    this.service.deleteReserva(reserva)
      .subscribe(data => {
        this.reservas = this.reservas.filter(e => e !== reserva);
      });
    alert('Estado eliminado');
    location.reload();
  }

  // Validación campo de valor de búsqueda y aplicaciónd del filtro
  aplicarFiltro() {
    this.getReservas();
  }

  // Se seleccionó un orden
  aplicarOrden() {
    this.getReservas();
  }

  // Botón Limpiar filtro
  limpiarFiltro() {
    this.filtroColumna = '';
    this.valorBusqueda = '';
    this.mostrarErrorValorBusqueda = false;
    this.getReservas();
  }

  // Botón Limpiar Orden
  limpiarOrden() {
    this.sortColumn = '';
    this.getReservas();
  }

  // Obtener array de páginas para paginación
  getArrayPaginas() {
    let arrayPaginas = [];
    for (let i = 0; i < this.totalPaginas; i++) {
      arrayPaginas.push(i);
    }
    return arrayPaginas;
  }

  // Pasaje entre páginas
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.getReservas();
  }

  parseDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  parseTime(horaInicio: Date, horaFin: Date): string {
    let horaInicioString: string = horaInicio.toString();
    let horaFinString: string = horaFin.toString();
    return new Date(horaInicioString).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + 
      " - " + new Date(horaFinString).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }
  
  parseMinutes(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    let minutesLeft = minutes % 60;
    return hours + ":" + minutesLeft.toString().padStart(2, '0');
  }

}
