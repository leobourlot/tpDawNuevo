import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paddingCeros',
  standalone: true
})
export class PaddingCerosPipe implements PipeTransform {

  transform(value: number | string, totalDigits: number = 6): string {
    const stringValue = value.toString();
    const zerosToAdd = totalDigits - stringValue.length;
    if (zerosToAdd > 0) {
      return '0'.repeat(zerosToAdd) + stringValue;
    }
    return stringValue;
  }

}
