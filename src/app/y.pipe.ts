import { Pipe, PipeTransform } from '@angular/core';
import * as numberToWords from 'number-to-words';

@Pipe({
  name: 'numtowords'
})
export class NumtowordsPipe implements PipeTransform {
  transform(value: number): string {
    const words = numberToWords.toWords(value);
    const wordsArray = words.split(' '); // Split the string into words
    const capitalizedWordsArray = wordsArray.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const capitalizedWords = capitalizedWordsArray.join(' '); // Join the words back together
    return capitalizedWords;
  }
}
