import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static sort(array: any[], type: any, property) {
    return array.sort((a, b) => {
      if (type === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      }
      if (type === 'desc') {
        return a[property] > b[property] ? -1 : 1;
      }
    });
  }
}
