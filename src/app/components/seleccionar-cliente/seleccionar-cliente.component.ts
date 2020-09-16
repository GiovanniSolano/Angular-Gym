import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  @Input() nombre;
  @Input() clienteValido;
  @Output() seleccionoCliente = new EventEmitter();
  @Output() canceloCliente = new EventEmitter();

  constructor(public usuariosService: UsuariosService) { }

  ngOnInit(): void {

  }

  buscarClientes(event) {

    this.usuariosService.buscarClientes(event);
    

  }

  seleccionarCliente(cliente: Cliente): void {
    this.nombre = `${cliente.nombre} ${cliente.apellido}`;
    this.usuariosService.clientes.forEach((cliente) => {
      cliente.visible = false;
    });
    this.seleccionoCliente.emit(cliente);
    
  }

  cancelarCliente() {
    this.nombre = undefined;
    this.canceloCliente.emit();

  }

}
