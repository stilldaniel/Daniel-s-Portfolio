import { Directive, ElementRef, OnDestroy, effect, inject, input } from '@angular/core';

/**
 * Shows a value like "1,000+" or "5+" and counts the number up from 0 when it scrolls into view.
 * Values that don't start with a number (e.g. "TMDB") are shown as-is.
 * Usage: <strong [appCountUp]="'1,000+'"></strong>
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnDestroy {
  readonly appCountUp = input.required<string>();

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private frame = 0;

  constructor() {
    effect(() => this.setup(this.appCountUp()));
  }

  private setup(value: string) {
    const node: HTMLElement = this.el.nativeElement;
    node.textContent = value;
    this.observer?.disconnect();

    const match = /^(\d[\d,]*)(.*)$/.exec(value);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!match || reduceMotion) return;

    const target = Number(match[1].replace(/,/g, ''));
    const suffix = match[2];
    const withCommas = match[1].includes(',');
    const format = (n: number) => (withCommas ? n.toLocaleString('en-US') : String(n)) + suffix;

    node.textContent = format(0);
    this.observer = new IntersectionObserver(
      entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        this.observer?.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          node.textContent = format(Math.round(target * eased));
          if (t < 1) this.frame = requestAnimationFrame(tick);
        };
        this.frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
