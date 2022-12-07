import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(value: Array<any>, field: any): Array<any> {
    if (!field) {
      return value;
    }
    if (!value) {
      return [];
    }
    return value.filter(mas =>
      new RegExp(field, 'gi').test(mas.name) ||
      new RegExp(field, 'gi').test(mas.type) ||
      new RegExp(field, 'gi').test(mas.color));
  }
}
