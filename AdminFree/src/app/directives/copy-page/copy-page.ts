import { Directive, HostListener } from '@angular/core';

/**
 * Directiva para evitar de copiar y pegar en un INPUT, se utiliza
 * para la seguridad de las claves de ingreso
 */
@Directive({
  selector: '[adminCopyPage]'
})
export class CopyPageDirective {
  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
