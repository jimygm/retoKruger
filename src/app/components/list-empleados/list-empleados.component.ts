import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { element, forEach } from 'angular';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  //items: Observable<any[]>;
  //constructor(firestore: AngularFirestore) {
  // this.items = firestore.collection('items').valueChanges();
  listEstadoVac = [{id:0,name:'Vacunado'},{id:1,name:'No vacunado'}]
  selectedEstado = this.listEstadoVac[0];
 
  listTipoVac = [{id:0,name:'Sputnik'},{id:1,name:'AstraZeneca'},{id:2,name:'Pfizer'},{id:3,name:'Jhonson&Jhonson'}]
  selectedTipo = this.listTipoVac[0];

  filterNombre= '';

  filterCedula='';
  filterEstado='';
  filterTipo='';
  empleados: any[] = [];
  constructor(private _empleadoService: EmpleadoService,
    private toastr: ToastrService) {

  }


  ngOnInit(): void {
    this.getEmpleados()
  }
  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      // console.log(data);
      this.empleados = [];
      data.forEach((element: any) => {
        //console.log(element.payload.doc.id)
        //  console.log(element.payload.doc.data())
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('Empleado eliminado');
      this.toastr.error('Usuario eliminado con éxito','Registro eliminado.')
      positionClass:'toast-bottom-right'
    }).catch(error => {
      console.log(error);
    })
  }

  onSelect(){
    let query= null;
    if (this.empleados !== null)  {
      query = this.getEmpleados() ;
      
    }
    
    }

}
