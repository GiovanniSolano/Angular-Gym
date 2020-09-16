import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  esEditable = false;
  id = '';

  constructor(private fb: FormBuilder,
              public usuariosService: UsuariosService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {



    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      telefono: [''],
      fecha_nacimiento: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.id = this.route.snapshot.params.idCliente;


    if (this.id !== undefined) {      
      this.cargarFormulario();
    } else {
      this.usuariosService.urlImagen = '';
    }



  }



  agregarCliente() {

    if (this.formularioCliente.invalid) {
      return;
    }
    this.usuariosService.agregarCliente(this.formularioCliente);

    

  }

  editarCliente(): void { 

    this.usuariosService.editar(this.formularioCliente, this.id);
    this.cargarFormulario();

  }

  cargarFormulario() {
    
      this.esEditable = true;
      this.usuariosService.buscarCliente(this.id).valueChanges().subscribe(cliente => {
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          telefono: cliente.telefono,
          fecha_nacimiento: new Date(cliente.fecha_nacimiento.seconds * 1000).toISOString().substr(0, 10),
          imageUrl: ''
        });
        this.usuariosService.urlImagen = cliente.imageUrl;
      });
    
  }
  get validarBoton(): boolean {
    return this.formularioCliente.invalid && !this.usuariosService.urlImagen;
  }
  get validarBotonEditar(): boolean {
    return this.formularioCliente.invalid && !this.usuariosService.urlImagen;
  }


  get nombreValido(): boolean {
    return this.formularioCliente.get('nombre').invalid  && this.formularioCliente.get('nombre').touched;
  }
  get apellidoValido(): boolean {
    return this.formularioCliente.get('apellido').invalid && this.formularioCliente.get('apellido').touched;
  }
  get correoValido(): boolean {
    return this.formularioCliente.get('correo').invalid  && this.formularioCliente.get('correo').touched;
  }
  get fechaValida(): boolean {
    return this.formularioCliente.get('fecha_nacimiento').invalid  && this.formularioCliente.get('fecha_nacimiento').touched;
  }
  get imagenValida(): boolean {
    return this.formularioCliente.get('imageUrl').invalid  && this.formularioCliente.get('imageUrl').touched;
  }

}
