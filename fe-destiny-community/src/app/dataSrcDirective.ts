import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDataSrc]'
})
export class DataSrcDirective {
  @Input('appDataSrc') dataSrc: string;

  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('data-src', this.dataSrc);
  }
}