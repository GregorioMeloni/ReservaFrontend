import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/Modelo/Estado';
import { ServiceService } from 'src/app/Service/service.service';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent {
  estados: Estado[];
  constructor(private service:ServiceService, private router:Router){
    this.estados = [];
  }
  ngOnInit(){
    this.service.getEstados()
    .subscribe(data=>{
      this.estados=data;
      console.log(data);
    })
  }
}
