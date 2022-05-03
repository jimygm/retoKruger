import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-create-datos',
  templateUrl: './create-datos.component.html',
  styleUrls: ['./create-datos.component.css']
})
export class CreateDatosComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  //Editar(string) / Eliminar(Null)
 id: string | null;
 listNroDosis = [{id:0,name:'Primera'},{id:1,name:'Segunda'},{id:2,name:'Tercera'}]
 selectedOption1 = this.listNroDosis[0];

 listEstadoVac = [{id:0,name:'Vacunado'},{id:1,name:'No vacunado'}]
 selectedEstado = this.listEstadoVac[0];

 listTipoVac = [{id:0,name:'Sputnik'},{id:1,name:'AstraZeneca'},{id:2,name:'Pfizer'},{id:3,name:'Jhonson&Jhonson'}]
 selectedTipo = this.listTipoVac[0];

 

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {

    this.createEmpleado = this.fb.group({
     // cedula: ['', Validators.required],
     fecha_nac: ['', Validators.required],
     direccion: ['', Validators.required],
     telefono: ['', Validators.required],
     estado_vacuna: ['', Validators.required],
     tipo_vacuna: ['', Validators.required],
     fecha_vacuna: ['', Validators.required],
     nro_vacuna: ['', Validators.required],
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
      console.log("aqui");
    }

if (this.id == null) {
  console.log("aqui 2");
}else{
  this.editarEmpleado(this.id)
}
  }

  
  editarEmpleado(id: string) {
    //this.loading =true;
    const empleado: any = {
      fecha_nac: this.createEmpleado.value.fecha_nac,
      direccion: this.createEmpleado.value. direccion,
      telefono: this.createEmpleado.value.telefono,
      estado_vacuna: this.selectedEstado.name,
      tipo_vacuna: this.selectedTipo.name,
     fecha_vacuna: this.createEmpleado.value.fecha_vacuna,
      nro_vacuna: this.selectedOption1.name
    }
    
    
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.toastr.info('El usuario fue modificado con éxito','Usuario editado')
      this.router.navigate(['/list-datos'])
    })
    }


  Editar() {
    
    if (this.id !== null) {
     // this.titulo = 'Editar Empleado';
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        // console.log(data.pay.load.data()['nombre']);
      //  this.createEmpleado.setValue({
          this.createEmpleado.patchValue({
          fecha_nac: data.payload.data()['fecha_nac'],
          direccion: data.payload.data()['direccion'],
          telefono: data.payload.data()['telefono'],
          estado_vacuna: data.payload.data()['estado_vacuna'],
          tipo_vacuna: data.payload.data()['tipo_vacuna'],
          fecha_vacuna: data.payload.data()['fecha_vacuna'],
          nro_vacuna: data.payload.data()['nro_vacuna']
        })
      })
    }
  }


}
