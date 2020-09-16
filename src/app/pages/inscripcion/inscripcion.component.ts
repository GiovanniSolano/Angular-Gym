import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../../models/inscripcion';
import { Cliente } from '../../models/cliente';
import { PreciosService } from '../../services/precios.service';
import { Precio } from 'src/app/models/precio';
import { MensajesService } from '../../services/mensajes.service';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado: Precio = new Precio();
  idPrecio: string = null;

  constructor(public preciosService: PreciosService,
              private mensajesService: MensajesService,
              public inscripcionesService: InscripcionesService) { }


  ngOnInit(): void {
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente() {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar() {

    const respuesta = this.inscripcion.validar();

    if ( respuesta.esValido ) {
      const inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total,
      };

      this.inscripcionesService.agregarInscripcion(inscripcionAgregar);

      this.inscripcion = new Inscripcion();
      this.clienteSeleccionado = new Cliente();
      this.precioSeleccionado = new Precio();
      this.idPrecio = null;


    } else {
      this.mensajesService.crearMensajeError('Error', 'Seleccione un cliente y un precio');

    }
    

  }

  seleccionarPrecio(id: string): void {
    const precioValor = this.preciosService.seleccionarPrecio(this.precioSeleccionado, id);
    this.inscripcion.precios = precioValor.ref;

    this.inscripcion.fecha = new Date();
    this.inscripcion.subTotal = precioValor.costo;
    this.inscripcion.iva = this.inscripcion.subTotal * 0.16;
    this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.iva;
 

    precioValor.tipoDuracion = Number(precioValor.tipoDuracion);

    if ( precioValor.tipoDuracion ===  1) {
      // Fecha final = precioSeleccionado.duracion * 1
      const dias: number = precioValor.duracion * 1;
      
      // tslint:disable-next-line: max-line-length
      const fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if ( precioValor.tipoDuracion ===  2) {
      // Fecha final = precioSeleccionado.duracion * 7
      const dias: number = precioValor.duracion * 7;
      
      // tslint:disable-next-line: max-line-length
      const fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if ( precioValor.tipoDuracion ===  3) {
      // Fecha final = precioSeleccionado.duracion * 15
      const dias: number = precioValor.duracion * 15;
      
      // tslint:disable-next-line: max-line-length
      const fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if ( precioValor.tipoDuracion ===  4) {
      // Fecha final = this.inscripcion.fecha un mes
      const meses = precioValor.duracion * 1;
      // tslint:disable-next-line: max-line-length
      const fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth() + meses, this.inscripcion.fecha.getDate());
      this.inscripcion.fechaFinal = fechaFinal;

    }
    if ( precioValor.tipoDuracion ===  5) {
      // Fecha final = this.inscripcion.fecha un año
      const anios = precioValor.duracion * 1;
      // tslint:disable-next-line: max-line-length
      const fechaFinal = new Date(this.inscripcion.fecha.getFullYear() + anios, this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate());
      this.inscripcion.fechaFinal = fechaFinal;
    }

  }



}
