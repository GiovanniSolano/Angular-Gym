import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';
import { MensajesService } from './mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  inscripciones: any[] = [];

  constructor(private db: AngularFirestore,
              private mensajesService: MensajesService) { 

                this.obtenerInscripciones();

              }


  agregarInscripcion(inscripcion) {
    
    this.db.collection('inscripciones').add(inscripcion).then(() => {

      this.mensajesService.crearMensajeSuccess('Inscripción guardada correctamente');
      this.obtenerInscripciones();

    }).catch(() => {
            this.mensajesService.crearMensajeError('Error', 'Ocurrió un error al guardar la información');

    });
  }

  obtenerInscripciones() {

    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((resultado) => {

      resultado.forEach((inscripcion) => {

        const inscripcionInfo = inscripcion.data();
        inscripcionInfo.id = inscripcion.id;
        this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente) => { 
          inscripcionInfo.clienteObtenido = cliente.data();
          inscripcionInfo.fecha = new Date(inscripcionInfo.fecha.seconds * 1000);
          inscripcionInfo.fechaFinal = new Date(inscripcionInfo.fechaFinal.seconds * 1000 );
          this.inscripciones.push(inscripcionInfo);
        });


      });

    });

  }

}
