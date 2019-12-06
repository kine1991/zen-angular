import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHtmlToPlainText]'
})
export class HtmlToPlainTextDirective {

  constructor(el: ElementRef) { 
    console.log('appHtmlToPlainText', el.nativeElement.value)
    // replace(/<[^>]*>/g, '')
  }

}
