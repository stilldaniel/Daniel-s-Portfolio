import { Component } from '@angular/core';
import { strengths } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-strengths',
  imports: [RevealDirective],
  template: `
    <section class="strengths">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">What sets me apart</span>
          <h2>More than just code</h2>
          <p>I care about how the product performs, how it feels, and whether it moves your numbers.</p>
        </div>
        <div class="grid">
          @for (s of strengths; track s.title; let i = $index) {
            <article class="card item" appReveal [revealDelay]="i * 120">
              <span class="icon">{{ s.icon }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .strengths { background: var(--bg-soft); }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
    .item { padding: 32px; transition: transform 0.25s, box-shadow 0.25s; }
    .item:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .icon { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 14px; background: var(--accent-soft); font-size: 1.5rem; margin-bottom: 20px; }
    h3 { font-size: 1.2rem; margin-bottom: 8px; }
    p { color: var(--muted); }
  `,
})
export class Strengths {
  protected readonly strengths = strengths;
}
