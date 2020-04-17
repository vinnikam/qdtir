import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appTextoNum]'
})
export class TextoNumDirective {

  constructor(private el: ElementRef) {
  }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^A-Z1-9 $#&-_]*/g, '');
    // solo permite mayusculas
    // this.el.nativeElement.value = initialValue.replace(/[^A-Za-z1-9 $#&-_]*/g, '');
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
