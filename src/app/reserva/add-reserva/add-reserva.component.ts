import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente, EspacioFisico, Reserva } from 'src/app/model/types';
import { ClienteService } from 'src/app/service/cliente.service';
import { EspacioFisicoService } from 'src/app/service/espacio-fisico.service';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.component.html',
  styleUrls: ['./add-reserva.component.scss']
})
export class AddReservaComponent {
  reserva: Reserva = {
    id: 1,
    fechaHoraInicio: '',
    fechaHoraFin: '',
    comentario: '',
    fechaHoraCreacion: '',
    cliente: {
      id: 1,
      nombre: '',
      apellido: '',
      nroTelefono: '',
      email: '',
      dni: 0,
      rol: {
        id: 1,
        nombre: '',
        descripcion: ''
      }
    },
    motivoReserva: '',
    estado: {
      id: 1,
      nombre: '',
      descripcion: '',
      color: ''
    },
    motivoRechazo: '',
    espacioFisico: {
      id: 1,
      nombre: '',
      capacidad: 0,
      descripcion: '',
      recursos: [],
      habilitado: false
    },
    duracion: 0
  };
  
  fechaHoraInicioError: boolean = false;
  fechaHoraFinError: boolean = false;
  motivoReservaError : boolean = false;

  clientes: Cliente[] = [];
  espaciosFisicos: EspacioFisico[] = [];

  constructor(private router: Router, private service: ReservaService, private clienteService: ClienteService, private espacioFisicoService: EspacioFisicoService) {

    this.reserva.fechaHoraInicio = this.obtenerFechaString();
    this.reserva.fechaHoraFin = this.obtenerFechaString();

  }

  obtenerFechaString(): string {
    let date = new Date();
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Función auxiliar para agregar un cero delante de números menores a 10
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  ngOnInit() {
    this.getClientes();
    this.getEspaciosFisicos();
  }
  //Botón Guardar
  Guardar(reserva: Reserva) {
    if (!this.validarCampos()) {
      return;
    }
    this.service.createReserva(reserva).subscribe((data) => {
      alert('Agregado con éxito');
      this.router.navigate(['listar-reserva']);
    },
    (error) => {
      console.error('Error al obtener los clientes:', error);
      alert(error.error.message);
    });
    
    
    
    // (data => {
    //   alert('Agregado con éxito');
    //   this.router.navigate(['listar-reserva']);
    // });




  }
  //Validación Campos Forms
  validarCampos(): boolean {
    let isValid = true;
 
    if (!this.reserva.fechaHoraInicio) {
      this.fechaHoraInicioError = true;
      isValid = false;
    } else {
      this.fechaHoraInicioError = false;
    }

    if (!this.reserva.fechaHoraFin) {
      this.fechaHoraFinError = true;
      isValid = false;
    } else {
      this.fechaHoraFinError = false;
    }
    
    if (!this.reserva.motivoReserva) {
      this.motivoReservaError = true;
      isValid = false;
    } else {
      this.motivoReservaError = false;
    }


    return isValid;
  }

  getClientes() {
    this.clienteService.getClientes(0, "id", "asc", " ", " ").subscribe(
      (data) => {
        this.clientes = data.content;
        this.reserva.cliente = this.clientes[0];
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );

  }
  
  getEspaciosFisicos() {
    this.espacioFisicoService.getEspaciosFisicos(0, "id", "asc", " ", " ").subscribe(
      (data) => {
        this.espaciosFisicos = data.content;
        this.reserva.espacioFisico = this.espaciosFisicos[0];
      },
      (error) => {
        console.error('Error al obtener los espacios físicos:', error);
      }
    );
  }

}
