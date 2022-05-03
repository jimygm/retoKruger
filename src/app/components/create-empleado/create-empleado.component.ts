import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  //Editar(string) / Eliminar(Null)
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {

    this.createEmpleado = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.Editar()
  }

  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }

if (this.id == null) {
  this.agregarEmpleado()
}else{
  this.editarEmpleado(this.id)
}
  }

  agregarEmpleado() {
    const empleado: any = {
      cedula: this.createEmpleado.value.cedula,
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      correo: this.createEmpleado.value.correo,
      usuario: this.createEmpleado.value.usuario,
      contrasena: this.createEmpleado.value.contrasena

          }
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('Usuario creado con éxito', 'Usuario registrado', { positionClass: 'toast-top-right' })

      //redirecciona a la principal
      this.router.navigate(['/list-empleados'])

    }).catch(error => {
      console.log(error);

    })
  }

  editarEmpleado(id: string) {
//this.loading =true;
const empleado: any = {
  cedula: this.createEmpleado.value.cedula,
  nombre: this.createEmpleado.value.nombre,
  apellido: this.createEmpleado.value.apellido,
  correo: this.createEmpleado.value.correo,
  usuario: this.createEmpleado.value.usuario,
      contrasena: this.createEmpleado.value.contrasena
}

this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
  this.toastr.info('El usuario fue modificado con éxito','Usuario editado')
  this.router.navigate(['/list-empleados'])
})
}


listarEmpleados(){

}

  Editar() {
    
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        // console.log(data.pay.load.data()['nombre']);
        this.createEmpleado.setValue({
          cedula: data.payload.data()['cedula'],
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          correo: data.payload.data()['correo'],
          usuario: data.payload.data()['usuario'],
          contrasena: data.payload.data()['contrasena']
          
        })
      })
    }
  }


  onSelect12(){
    let query= null;
    if (this.id !== null)  {
      query = this._empleadoService.getEmpleado(this.id);
      
    }
      
  
  
  }



  public validador: boolean | undefined; 
validadorDeCedula(cedula: String) {
  let cedulaCorrecta = false;
  if (cedula.length == 10)
  {    
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
          // El ultimo digito se lo considera dígito verificador
          let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
          let verificador = parseInt(cedula.substring(9, 10));
          let suma:number = 0;
          let digito:number = 0;
          for (let i = 0; i < (cedula.length - 1); i++) {
              digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
              suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
        //      console.log(suma+" suma"+coefValCedula[i]); 
          }
          suma= Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
          if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
              cedulaCorrecta = true;
          } else if ((10 - (Math.round(suma % 10))) == verificador) {
              cedulaCorrecta = true;
          } else {
              cedulaCorrecta = false;
          }
      } else {
          cedulaCorrecta = false;
      }
  } else {
      cedulaCorrecta = false;
  }
this.validador= cedulaCorrecta;

}







}
