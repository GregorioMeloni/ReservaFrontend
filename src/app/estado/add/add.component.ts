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
  constructor(private router:Router, private service: ServiceService){

  }
  ngOnInit(){

  }

  Guardar(estado:Estado){
    this.service.createEstado(estado)
    .subscribe(data=>{
      alert("Agregado con éxito");
      this.router.navigate(["listar"]);
    })
  }
}
