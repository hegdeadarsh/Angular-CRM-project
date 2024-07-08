import { Pipe, PipeTransform } from '@angular/core';
import * as numberToWords from 'number-to-words';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: number | any[], searchText: string): any {
    if (typeof value === 'number') {
      return numberToWords.toWords(value);
    } else if (Array.isArray(value)) {
      if (!searchText) return value;

      searchText = searchText.toLowerCase();

      return value.filter(item => 
        (item.companyName && item.companyName.toLowerCase().includes(searchText)) ||
        (item.machineNumber && item.machineNumber.toString().toLowerCase().includes(searchText)) ||
        (item.cutomerName && item.cutomerName.toString().toLowerCase().includes(searchText))
      );
    }

    return value;
  }
}
