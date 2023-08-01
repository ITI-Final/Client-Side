import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return value;
    }

    searchTerm = searchTerm.toLowerCase();
    return value.filter(item => {
      for (const prop in item) {
        if (item[prop] && item[prop].toString().toLowerCase().includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }


}
