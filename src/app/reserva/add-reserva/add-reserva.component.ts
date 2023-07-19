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
    fechaHoraInicio: new Date(),
    fechaHoraFin: new Date(),
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

  constructor(private router: Router, private service: ReservaService, private clienteService: ClienteService, private espacioFisicoService: EspacioFisicoService) {}

  ngOnInit() {
    this.getClientes();
    this.getEspaciosFisicos();
  }
  //Botón Guardar
  Guardar(reserva: Reserva) {
    if (!this.validarCampos()) {
      return;
    }
    this.service.createReserva(reserva).subscribe(data => {
      alert('Agregado con éxito');
      this.router.navigate(['listar-reserva']);
    });
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
      },
      (error) => {
        console.error('Error al obtener los espacios físicos:', error);
      }
    );
  }

}
