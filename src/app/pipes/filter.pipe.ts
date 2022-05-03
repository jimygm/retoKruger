import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resulPosts = [];
    for (const empleados of value) {

      //toLowerCase(): Metodo para convertir en minusculas
      if (empleados.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        //console.log('Sip');
        resulPosts.push(empleados);
      }else {
        if (empleados.tipo_vacuna.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          //console.log('Sip');
          resulPosts.push(empleados);
        }
      
      else {
        if (empleados.estado_vacuna.indexOf(arg) > -1) {
          //console.log('Sip');
          resulPosts.push(empleados);
        }
        }
      }
    };
    return resulPosts;
  }

}
