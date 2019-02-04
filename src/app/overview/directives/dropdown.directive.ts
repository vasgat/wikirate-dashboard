import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  private isOpen = false;
  constructor(private _el: ElementRef) {

  }

  @HostBinding('class.show') get opened() {
    return this.isOpen;
  }
  @HostListener('keydown')
  @HostListener('input') open() {
    if (this._el.nativeElement.querySelector('.dropdown-menu') !== null) {
      this.isOpen = true;
      this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
    }
  }
  @HostListener('click') closeOnClick() {
    if (this._el.nativeElement.querySelector('.dropdown-menu') !== null) {
      this.isOpen = false;
      this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }
  @HostListener('document:click', ['$event.target']) close (targetElement) {
    const inside: boolean = this._el.nativeElement.contains(targetElement);
    if (!inside) {
      this.isOpen = false;
      if (this._el.nativeElement.querySelector('.dropdown-menu') !== null) {
        this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
      }
    }
  }
}


