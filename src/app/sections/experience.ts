import { Component, inject, signal } from '@angular/core';
import { jobs } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <section id="experience">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">Career roadmap</span>
          <h2>Where I've Made an Impact</h2>
          <p>Every role has been a stepping stone, from intensive internships to production-grade work for real businesses.</p>
        </div>

        <ol class="timeline" appReveal>
          @for (job of jobs; track job.company; let i = $index) {
            <li appReveal>
              <span class="marker"></span>
              <article class="card">
                <div class="meta">
                  <span class="chip chip-soft">{{ job.period }}</span>
                  <small>{{ job.location }}</small>
                </div>
                <h3>{{ job.role }} <span>at {{ job.company }}</span></h3>
                <p>{{ job.summary }}</p>

                @if (expanded() === i) {
                  <div class="details">
                    <h4>Key Achievements</h4>
                    <ul>
                      @for (a of job.achievements; track a) { <li>{{ a }}</li> }
                    </ul>
                    <h4>Technologies Used</h4>
                    <div class="tech">
                      @for (t of job.tech; track t) { <span class="chip">{{ t }}</span> }
                    </div>
                  </div>
                }
                <button class="toggle" (click)="toggle(i)">{{ expanded() === i ? 'Show less ↑' : 'Show more ↓' }}</button>
              </article>
            </li>
          }
        </ol>

        <div class="cta-line" appReveal>
          <p>Let's discuss how I can bring this experience to your next project.</p>
          <button class="btn btn-primary" (click)="connect.open()">Get In Touch →</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    #experience { background: var(--bg-soft); }
    .timeline { list-style: none; max-width: 760px; margin: 0 auto; position: relative; padding-left: 36px; }
    .timeline::before {
      content: ''; position: absolute; left: 9px; top: 8px; bottom: 8px; width: 2px;
      background: linear-gradient(var(--accent), var(--accent-2)); border-radius: 2px;
      /* The line draws downward once the timeline scrolls into view. */
      transform: scaleY(0); transform-origin: top; transition: transform 1.8s cubic-bezier(0.2, 0.7, 0.2, 1);
    }
    .timeline.visible::before { transform: scaleY(1); }
    /* The list itself shouldn't fade; only its line and items animate. */
    .timeline.reveal { opacity: 1; transform: none; }
    .timeline > li { position: relative; margin-bottom: 28px; }
    .marker { position: absolute; left: -36px; top: 28px; width: 20px; height: 20px; border-radius: 50%; background: var(--surface); border: 4px solid var(--accent); }
    .marker { transform: scale(0); transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s; }
    li.visible .marker { transform: scale(1); }
    .card { padding: 28px; }
    .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 12px; }
    .meta small { color: var(--muted); }
    h3 { font-size: 1.3rem; }
    h3 span { color: var(--accent); font-weight: 600; }
    p { color: var(--muted); margin-top: 8px; }
    .details { margin-top: 20px; animation: open 0.3s ease; }
    h4 { font-size: 0.95rem; margin: 16px 0 8px; }
    ul { padding-left: 20px; color: var(--text-2); }
    ul li { margin-bottom: 6px; }
    .tech { display: flex; flex-wrap: wrap; gap: 8px; }
    .toggle { margin-top: 16px; color: var(--accent); font-weight: 600; font-size: 0.9rem; }
    @keyframes open { from { opacity: 0; transform: translateY(-6px); } }

    @media (prefers-reduced-motion: reduce) {
      .timeline::before, .marker { transform: none; transition: none; }
    }
  `,
})
export class Experience {
  protected readonly connect = inject(ConnectService);
  protected readonly jobs = jobs;
  protected readonly expanded = signal<number | null>(null);

  protected toggle(i: number) {
    this.expanded.set(this.expanded() === i ? null : i);
  }
}
