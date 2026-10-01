import { Component, inject, computed, signal } from '@angular/core';
import { Project, projects } from '../portfolio.data';
import { RevealDirective } from '../reveal.directive';
import { ConnectService } from '../connect.service';
import { CountUpDirective } from '../count-up.directive';
import { GlassDirective } from '../glass.directive';

type Filter = 'all' | Project['category'];

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, CountUpDirective, GlassDirective],
  template: `
    <section id="projects">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">Projects</span>
          <h2>Featured Projects</h2>
          <p>Real solutions, measurable results. A selection of recent work built for clients and startups.</p>
        </div>

        @if (filters.length > 2) {
          <div class="filters" appReveal>
            @for (f of filters; track f.value) {
              <button [class.active]="filter() === f.value" (click)="filter.set(f.value)">{{ f.label }}</button>
            }
          </div>
        }

        <div class="grid">
          @for (p of visible(); track p.title; let i = $index) {
            <article class="card project" appReveal [revealDelay]="(i % 2) * 120">
              <div class="cover" [class.mobile]="p.category === 'mobile'">
                <a class="browser" [href]="p.liveUrl || p.repoUrl" target="_blank" rel="noopener" [attr.aria-label]="'Open ' + p.title">
                  <div class="bar">
                    <span class="dots"><i></i><i></i><i></i></span>
                    @if (p.liveUrl) { <span class="url">{{ host(p.liveUrl) }}</span> }
                  </div>
                  @if (p.image) {
                    <img [src]="p.image" [alt]="p.title + ' home screen'" loading="lazy" width="1200" height="750" />
                    <span class="peek" appGlass aria-hidden="true">
                      {{ p.liveUrl ? 'View live' : 'View code' }}
                      <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </span>
                  } @else {
                    <div class="placeholder">{{ p.title }}</div>
                  }
                </a>
              </div>
              <div class="body">
                <!-- The category chip only adds information when there are both web and mobile projects. -->
                @if (filters.length > 2) {
                  <span class="chip chip-soft">{{ p.category === 'web' ? 'Web App' : 'Mobile App' }}</span>
                }
                <h3>{{ p.title }}</h3>
                <small class="role">{{ p.role }}</small>
                <p>{{ p.description }}</p>
                <div class="stats">
                  @for (s of p.stats; track s.label) {
                    <div class="stat"><strong [appCountUp]="s.value"></strong><small>{{ s.label }}</small></div>
                  }
                </div>
                <div class="tech">
                  @for (t of p.tech; track t) { <span class="chip">{{ t }}</span> }
                </div>
                <div class="links">
                  @if (p.liveUrl) {
                    <a [href]="p.liveUrl" target="_blank" rel="noopener" class="btn btn-primary" [attr.aria-label]="'Visit ' + p.title + ' live site'">
                      Live Site
                      <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </a>
                  }
                  @if (p.repoUrl) {
                    <a [href]="p.repoUrl" target="_blank" rel="noopener" class="btn btn-outline" [attr.aria-label]="p.title + ' on GitHub'">
                      <svg viewBox="0 0 24 24"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
                      GitHub
                    </a>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <div class="cta-line" appReveal>
          <p>Have a project you'd like to discuss?</p>
          <button class="btn btn-primary" (click)="connect.open()">Start a Conversation →</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .filters { display: flex; justify-content: center; gap: 8px; margin-bottom: 40px; flex-wrap: wrap; }
    .filters button { padding: 10px 20px; border-radius: 999px; border: 1px solid var(--border); font-weight: 500; font-size: 0.9rem; transition: all 0.2s; }
    .filters button:hover { border-color: var(--accent); }
    .filters button.active { background: var(--text); color: var(--bg); border-color: var(--text); }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 460px), 1fr)); gap: 28px; }
    .project { overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s, box-shadow 0.3s; }
    .project:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    /* Screenshot shown inside a browser-window frame that sits on the gradient and runs off the bottom edge. */
    .cover {
      padding: 32px 32px 0;
      background:
        radial-gradient(300px 160px at 85% 0%, rgba(255,255,255,0.25), transparent 70%),
        linear-gradient(135deg, var(--accent), #6366f1);
    }
    .cover.mobile { background: linear-gradient(135deg, var(--accent-2), #ec4899); }
    /* Glass chip that slides up over the screenshot on hover. */
    .browser { position: relative; }
    .peek {
      position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 600; color: var(--text);
      opacity: 0; transform: translateY(10px); transition: opacity 0.3s, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
    }
    .peek svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .project:hover .peek, .browser:focus-visible .peek { opacity: 1; transform: none; }
    .browser {
      display: block; overflow: hidden; border-radius: 12px 12px 0 0; background: var(--surface);
      box-shadow: 0 -4px 30px -6px rgba(15, 23, 42, 0.35);
    }
    .bar { display: flex; align-items: center; gap: 12px; height: 30px; padding: 0 12px; background: var(--surface-2); border-bottom: 1px solid var(--border); }
    .dots { display: flex; gap: 6px; }
    .dots i { width: 9px; height: 9px; border-radius: 50%; background: #cbd5e1; }
    .dots i:nth-child(1) { background: #f87171; }
    .dots i:nth-child(2) { background: #fbbf24; }
    .dots i:nth-child(3) { background: #34d399; }
    .url {
      flex: 1; min-width: 0; max-width: 260px; margin: 0 auto; padding: 2px 10px; border-radius: 6px;
      background: var(--surface); color: var(--muted); font-size: 0.7rem; text-align: center;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .browser img, .placeholder { display: block; width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
    /* Tall full-page screenshots slowly scroll to the bottom on hover; normal-height ones just zoom slightly. */
    .browser img { transition: object-position 6s ease-in-out, transform 0.6s ease; }
    .project:hover .browser img { object-position: bottom; transform: scale(1.02); }
    .placeholder { display: grid; place-items: center; background: var(--bg-soft); color: var(--muted); font-weight: 700; }

    .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 12px 0; border-block: 1px solid var(--border); }
    .stat { min-width: 0; text-align: center; padding: 0 6px; }
    .stat + .stat { border-left: 1px solid var(--border); }
    .stat strong { display: block; font-size: 1.05rem; font-weight: 800; color: var(--accent-dark); line-height: 1.3; overflow-wrap: break-word; }
    .stat small { display: block; color: var(--muted); font-size: 0.75rem; line-height: 1.3; }

    .body { padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .body .chip-soft { align-self: flex-start; font-size: 0.75rem; }
    h3 { font-size: 1.35rem; }
    .role { color: var(--accent); font-weight: 600; font-size: 0.85rem; margin-top: -8px; }
    .body p { color: var(--muted); }
    .tech { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech .chip { padding: 4px 10px; font-size: 0.75rem; }
    .links:empty { display: none; }
    .links { display: flex; gap: 10px; margin-top: auto; padding-top: 8px; }
    .links .btn { padding: 10px 20px; font-size: 0.9rem; white-space: nowrap; }
    .links svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

    @media (max-width: 560px) {
      .cover { padding: 20px 18px 0; }
      .bar { height: 24px; }
      .url { font-size: 0.65rem; }
      .body { padding: 20px 18px 22px; gap: 10px; }
      h3 { font-size: 1.2rem; }
      .body p { font-size: 0.95rem; }
      /* Two equal buttons that share the row instead of wrapping their text. */
      .links .btn { flex: 1; justify-content: center; padding: 10px 12px; }
      .stat strong { font-size: 0.95rem; }
      .stat small { font-size: 0.7rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      .browser img { transition: none; }
      .project:hover .browser img { object-position: top; transform: none; }
    }
  `,
})
export class Projects {
  protected readonly connect = inject(ConnectService);
  // Only offer a filter for categories that have projects; the tabs are hidden when there's just one.
  protected readonly filters: { label: string; value: Filter }[] = [
    { label: 'All Projects', value: 'all' as Filter },
    ...(['web', 'mobile'] as const)
      .filter(c => projects.some(p => p.category === c))
      .map(c => ({ label: c === 'web' ? 'Web Apps' : 'Mobile Apps', value: c as Filter })),
  ];
  protected readonly filter = signal<Filter>('all');
  protected readonly visible = computed(() =>
    this.filter() === 'all' ? projects : projects.filter(p => p.category === this.filter()),
  );

  protected host(url: string) {
    return new URL(url).hostname.replace(/^www\./, '');
  }
}
