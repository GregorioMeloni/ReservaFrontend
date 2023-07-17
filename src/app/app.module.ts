import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './estado/listar/listar.component';
import { AddComponent } from './estado/add/add.component';
import { EditComponent } from './estado/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { EstadoComponent } from './estado/estado.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from './Service/service.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AddReservaComponent } from './reserva/add-reserva/add-reserva.component';
import { EditReservaComponent } from './reserva/edit-reserva/edit-reserva.component';
import { ListarReservaComponent } from './reserva/listar-reserva/listar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    AddComponent,
    EditComponent,
    HomeComponent,
    EstadoComponent,
    ErrorComponent,
    ReservaComponent,
    AddReservaComponent,
    EditReservaComponent,
    ListarReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
