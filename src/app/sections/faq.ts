import { Component, inject, computed, signal } from '@angular/core';
import { faqs } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';
import { ConnectService } from '../connect.service';

const INITIAL_COUNT = 3;

@Component({
  selector: 'app-faq',
  imports: [RevealDirective],
  template: `
    <section id="faq">
      <div class="container narrow">
        <div class="section-head" appReveal>
          <span class="eyebrow">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions about working with me. Can't find what you need? Let's talk.</p>
        </div>

        <div class="filters" appReveal>
          @for (c of categories; track c) {
            <button [class.active]="category() === c" (click)="selectCategory(c)">{{ c }}</button>
          }
        </div>

        <div class="list">
          @for (f of visible(); track f.question) {
            <div class="card item" [class.open]="open() === f.question">
              <button class="question" (click)="open.set(open() === f.question ? null : f.question)" [attr.aria-expanded]="open() === f.question">
                {{ f.question }}
                <span class="icon">+</span>
              </button>
              <div class="answer"><p>{{ f.answer }}</p></div>
            </div>
          }
        </div>

        @if (filtered().length > INITIAL_COUNT) {
          <div class="more">
            <button class="btn btn-outline" (click)="showAll.set(!showAll())">
              {{ showAll() ? 'Show Less' : 'Show All FAQs' }}
            </button>
          </div>
        }

        <div class="cta-line">
          <p>Still have questions? I'm happy to help.</p>
          <button class="btn btn-primary" (click)="connect.open()">Contact Me →</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    #faq { background: var(--bg-soft); }
    .narrow { max-width: 820px; }
    .filters { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
    .filters button { padding: 8px 18px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-size: 0.9rem; transition: all 0.2s; }
    .filters button.active { background: var(--accent); border-color: var(--accent); color: #fff; }
    .list { display: flex; flex-direction: column; gap: 14px; }
    .item { box-shadow: none; overflow: hidden; }
    .question { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 22px 26px; font-weight: 600; font-size: 1.02rem; text-align: left; }
    .icon { flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%; background: var(--accent-soft); color: var(--accent); display: grid; place-items: center; font-size: 1.2rem; transition: transform 0.3s; }
    .open .icon { transform: rotate(45deg); }
    .answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
    .answer p { overflow: hidden; padding: 0 26px; color: var(--muted); }
    .open .answer { grid-template-rows: 1fr; }
    .open .answer p { padding-bottom: 22px; }
    .more { text-align: center; margin-top: 28px; }
  `,
})
export class Faq {
  protected readonly connect = inject(ConnectService);
  protected readonly INITIAL_COUNT = INITIAL_COUNT;
  protected readonly categories = ['All', ...new Set(faqs.map(f => f.category))];
  protected readonly category = signal('All');
  protected readonly showAll = signal(false);
  protected readonly open = signal<string | null>(null);

  protected readonly filtered = computed(() =>
    this.category() === 'All' ? faqs : faqs.filter(f => f.category === this.category()),
  );
  protected readonly visible = computed(() =>
    this.showAll() ? this.filtered() : this.filtered().slice(0, INITIAL_COUNT),
  );

  protected selectCategory(c: string) {
    this.category.set(c);
    this.showAll.set(false);
  }
}
