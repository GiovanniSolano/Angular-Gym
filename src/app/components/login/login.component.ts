import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  constructor(private crearForm: FormBuilder,
              private auth: AngularFireAuth,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
    this.formularioLogin = this.crearForm.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });

  }



  detenerSpinner(tiempo) {

    return new Promise((resolve) => {

      setTimeout(() => {
        resolve(this.spinner.hide());
      }, tiempo);

    });

  }

  ingresar() {

    if(this.formularioLogin.valid) {
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
                .then( async(usuario) => {
                  await this.detenerSpinner(2000);
                  console.log(usuario);
                }).catch(async(err) => {
                  await this.detenerSpinner(2000);
                  Swal.fire({
                    icon: 'error',
                    text: 'Correo o contraseña incorrectos!',
                  });
                });

    }

  }

  get correoNoValido() {
    return this.formularioLogin.get('email').invalid && this.formularioLogin.get('email').touched;
  }
  get passwordNoValido() {
    return this.formularioLogin.get('password').invalid && this.formularioLogin.get('password').touched;
  }

  }

