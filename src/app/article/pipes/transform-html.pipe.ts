import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformHtml'
})
export class TransformHtmlPipe implements PipeTransform {
  transform(value: string, limit, completeWords = false, ellipsis = '...') {
    value = value.replace(/<\/?[^>]+>/ig, " "); // html tags to plain text
    // if (completeWords) {
    //   value = value.substr(0, limit).lastIndexOf(' ');
    // }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}