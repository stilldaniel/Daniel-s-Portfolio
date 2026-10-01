import { Component } from '@angular/core';
import { testimonials } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-testimonials',
  imports: [RevealDirective],
  template: `
    <section id="testimonials">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">Client feedback</span>
          <h2>What Clients Say</h2>
          <p>Real feedback from founders and product managers I've worked with.</p>
        </div>
        <div class="grid">
          @for (t of testimonials; track t.name; let i = $index) {
            <figure class="card" appReveal [revealDelay]="i * 120">
              <span class="quote-mark">“</span>
              <blockquote>{{ t.quote }}</blockquote>
              <figcaption>
                <span class="avatar">{{ t.name[0] }}</span>
                <span>
                  <strong>{{ t.name }}</strong>
                  <small>{{ t.title }}</small>
                </span>
                <span class="chip chip-soft">{{ t.project }}</span>
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 28px; }
    figure { padding: 36px; position: relative; }
    .quote-mark { position: absolute; top: 8px; right: 28px; font-size: 6rem; line-height: 1; color: var(--accent-soft); font-family: Georgia, serif; }
    blockquote { font-size: 1.1rem; line-height: 1.7; position: relative; }
    figcaption { display: flex; align-items: center; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
    .avatar { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--accent); color: #fff; font-weight: 700; }
    figcaption strong { display: block; }
    figcaption small { color: var(--muted); }
    figcaption .chip { margin-left: auto; font-size: 0.75rem; }
  `,
})
export class Testimonials {
  protected readonly testimonials = testimonials;
}
