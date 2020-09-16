import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MensajesService } from './mensajes.service';
import { Precio } from '../models/precio';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {


  precios: Precio[] = [];
  esEditar = false;
  id = '';

  constructor(private db: AngularFirestore,
              private mensajesService: MensajesService) {

                this.obtenerPrecios();

               }


  agregar(formPrecio: FormGroup) {
    this.db.collection<Precio>('precios').add(formPrecio.value).then(() => {

      this.mensajesService.crearMensajeSuccess('Precio agregado correctamente');
      formPrecio.reset();
      this.obtenerPrecios();

    }).catch(() => {
      this.mensajesService.crearMensajeError('Error', 'No se pudo guardar la información');
    });
  }

  asignarValores(precio: Precio, formPrecio: FormGroup) {

    this.esEditar = true;
    formPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    });

    this.id = precio.id;

  }

  editar(formPrecio: FormGroup) {
    this.db.doc(`precios/${this.id}`).update(formPrecio.value).then(() => {
      this.mensajesService.crearMensajeSuccess('La información se editó correctamente');
      formPrecio.reset();
      this.esEditar = false;
      this.obtenerPrecios();
    }).catch(() => {
      this.mensajesService.crearMensajeError('Error', 'Ocurrió un error al editar');
    });
  }


  obtenerPrecios() {
    this.precios.length = 0;
    this.db.collection<Precio>('precios').get().subscribe((precios) => {

      for (const precio of precios.docs) {
        const precioInfo = precio.data() as Precio;
        precioInfo.id = precio.id;
        precioInfo.ref = precio.ref;
        this.precios.push(precioInfo);
      }
    });
  }

  seleccionarPrecio(precio: Precio, id: string): Precio {

    return precio = this.precios.find(x => x.id === id);
    
  }
}
