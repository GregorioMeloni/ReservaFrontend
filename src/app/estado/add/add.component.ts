import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/Modelo/Estado';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  estado: Estado = new Estado();
  nombreError: boolean = false;
  descripcionError: boolean = false;
  colorError: boolean = false;

  constructor(private router: Router, private service: ServiceService) {}

  ngOnInit() {}

  Guardar(estado: Estado) {
    if (!this.validarCampos()) {
      return;
    }

    this.service.createEstado(estado).subscribe(data => {
      alert('Agregado con éxito');
      this.router.navigate(['listar']);
    });
  }

  validarCampos(): boolean {
    let isValid = true;

    if (!this.estado.nombre) {
      this.nombreError = true;
      isValid = false;
    } else {
      this.nombreError = false;
    }

    if (!this.estado.descripcion) {
      this.descripcionError = true;
      isValid = false;
    } else {
      this.descripcionError = false;
    }

    if (!this.estado.color || this.estado.color.length > 6) {
      this.colorError = true;
      isValid = false;
    } else {
      this.colorError = false;
    }

    return isValid;
  }
}
