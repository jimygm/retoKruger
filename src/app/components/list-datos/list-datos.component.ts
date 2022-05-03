import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { element, forEach } from 'angular';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-list-datos',
  templateUrl: './list-datos.component.html',
  styleUrls: ['./list-datos.component.css']
})
export class ListDatosComponent implements OnInit {

  filterNombre= '';

  filterCedula='';
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



  
}
