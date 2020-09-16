import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }


  crearMensajeError(titulo: string, mensaje: string): void {

    Swal.fire({
      icon: 'error',
      title: titulo ,
      text: mensaje,
      showConfirmButton: true,
    });

  }

  crearMensajeSuccess(titulo: string, mensaje?: string): void {

    Swal.fire({
      icon: 'success',
      title: titulo,
      showConfirmButton: true,
    });

  }

}
