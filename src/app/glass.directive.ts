import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Applies the liquid-glass material (.glass in styles.css) and makes its specular sheen
 * follow the pointer, so the surface catches the light as you move across it.
 * Usage: <div appGlass>…</div>
 */
@Directive({
  selector: '[appGlass]',
  host: {
    class: 'glass',
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'reset()',
  },
})
export class GlassDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  protected move(e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    const node: HTMLElement = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    node.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  protected reset() {
    const node: HTMLElement = this.el.nativeElement;
    node.style.removeProperty('--mx');
    node.style.removeProperty('--my');
  }
}
