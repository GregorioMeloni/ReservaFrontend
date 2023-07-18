import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/Modelo/Reserva';
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

  // Inyección de dependencias
  constructor(private service: ReservaService, private router: Router) {
    this.reservas = [];
  }

  // Al iniciar el componente, se obtienen las reservas
  ngOnInit() {
    this.getReservas();
  }

  // Botón Nuevo redirije a componente add
  nuevo() {
    this.router.navigate(["add-reserva"]);
  }

  // Obtener reservas con paginación y ordenamiento
  getReservas() {
    this.service.getReservas(this.paginaActual, this.sortColumn, this.sortDir, this.filtroColumna, this.valorBusqueda)
      .subscribe((data: { content: Reserva[]; totalPages: number; }) => {
        this.reservas = data.content;
        this.totalPaginas = data.totalPages;
      }
    );
  }

  // Botón Editar
  editar(reserva: Reserva): void {
    localStorage.setItem('id', reserva.id.toString());
    this.router.navigate(['edit']);
  }

  //Botón Eliminar
  delete(reserva: Reserva) {
    this.service.deleteReserva(reserva)
      .subscribe(data => {
        this.reservas = this.reservas.filter(e => e !== reserva);
      });
    alert('Estado eliminado');
    location.reload();
  }

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

  // Botón Limpiar Orden
  limpiarOrden() {
    this.sortColumn = '';
    this.ordenAplicado = false;
    this.getReservas();
  }

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
