import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/Modelo/Reserva';
import { ReservaService } from 'src/app/Service/reserva.service';

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
  comentarioError: boolean = false;
  motivoReservaError : boolean = false;
  motivoRechazoError : boolean = false;
  clienteError : boolean = false;
  estadoError : boolean = false;
  espacioFisicoError : boolean = false;

  constructor(private router: Router, private service: ReservaService) {}

  ngOnInit() {}
  //Botón Guardar
  Guardar(reserva: Reserva) {
    if (!this.validarCampos()) {
      return;
    }
    console.log(reserva)
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
    
    if (!this.reserva.comentario) {
      this.comentarioError = true;
      isValid = false;
    } else {
      this.comentarioError = false;
    }
    
    if (!this.reserva.motivoReserva) {
      this.motivoReservaError = true;
      isValid = false;
    } else {
      this.motivoReservaError = false;
    }

    if (!this.reserva.motivoRechazo) {
      this.motivoRechazoError = true;
      isValid = false;
    } else {
      this.motivoRechazoError = false;
    }
    
    if (!this.reserva.cliente.nombre) {
      this.clienteError = true;
      isValid = false;
    } else {
      this.clienteError = false;
    }
    
    if (!this.reserva.estado.nombre) {
      this.estadoError = true;
      isValid = false;
    } else {
      this.estadoError = false;
    }

    if (!this.reserva.espacioFisico.nombre) {
      this.espacioFisicoError = true;
      isValid = false;
    } else {
      this.espacioFisicoError = false;
    }


    return isValid;
  }
}
