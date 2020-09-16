import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MensajesService } from './mensajes.service';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  clientes: Cliente[] = [];
  porcentaje = 0;
  urlImagen = '';
  formValido = false;
  constructor(private db: AngularFirestore, 
              private storage: AngularFireStorage,
              private mensajesService: MensajesService) {
                this.cargarClientes();


    // this.db.collection('clientes').valueChanges().subscribe((usuarios) => {
    //   console.log(usuarios);
    //   this.clientes = usuarios;
    // });


   }

   buscarCliente(id: string) {
    return this.db.doc<any>(`clientes/${id}`);
   }

   agregarCliente(formCliente: FormGroup) {

    formCliente.value.imageUrl =  this.urlImagen;
    formCliente.value.fecha_nacimiento = new Date(formCliente.value.fecha_nacimiento);
    this.db.collection<Cliente>('clientes').add(formCliente.value).then(() => {
    this.mensajesService.crearMensajeSuccess('Cliente agregado correctamente');
    this.cargarClientes();
    formCliente.reset();
    this.porcentaje = 0;
     });
   }

   

   subirImagen(event): void {

    if (event.target.files.length === 0){
      return;
    }

    const nombre = new Date().getTime().toString();
    const archivo = event.target.files[0];
    const extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
    const ruta = `clientes/${nombre}${extension}`;
    const ref = this.storage.ref(ruta);
    const uploadImage = this.storage.upload(ruta, archivo);
    uploadImage.then(() => {

      console.log('Imagen subida');

      ref.getDownloadURL().subscribe((url) => {
        this.urlImagen = url;
      });

    });

    uploadImage.percentageChanges().subscribe((porcentaje) => {

      this.porcentaje = porcentaje;
    });
   }

   editar(formCliente: FormGroup, id: string) {
     

    formCliente.value.imageUrl = this.urlImagen;
    formCliente.value.fecha_nacimiento = new Date(formCliente.value.fecha_nacimiento);

    this.db.doc(`clientes/${id}`).update(formCliente.value).then(()=>{ 
      this.mensajesService.crearMensajeSuccess('Información actualizada correctamente');
      this.cargarClientes();
      this.porcentaje = 0;
    }).catch(() => {
      this.mensajesService.crearMensajeError('Error', 'Ocurrió un problema al editar al cliente');
    });

   }

   cargarClientes() {
    this.clientes.length = 0;
    this.db.collection<Cliente>('clientes').get().subscribe((resultado) => {

      for (const item of resultado.docs) {

        const cliente = item.data() as Cliente;
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.unshift(cliente);
      }

    });
   }

   buscarClientes(nombre: string) {

    if(nombre.length === 0) {
      this.clientes.forEach((cliente) => {
        cliente.visible = false;
        this.cargarClientes();
      });
    }

    this.clientes.forEach((cliente) => {
      if ( cliente.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        cliente.visible = true;
      } else {
        cliente.visible = false;
      }
    });

   }



  }


