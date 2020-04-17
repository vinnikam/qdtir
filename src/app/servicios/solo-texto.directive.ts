import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSoloTexto]'
})
export class SoloTextoDirective {

  constructor(private el: ElementRef) {
  }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.el.nativeElement.value;
    // this.el.nativeElement.value = initialValue.replace(/[^A-Za-z ]*/g, '');
    this.el.nativeElement.value = initialValue.replace(/[^A-Z ]*/g, '');
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }


}
